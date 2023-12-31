const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/email");
const { emailTemplate } = require("../utils/template");

const register = async (req, res) => {
  let { fullNames, email, password, role } = req.body;

  const firstName = fullNames.split(" ")[0];

  try {
    // check if user already exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: `Hey ${firstName} you already have an account, please login`,
      });
    }

    // hash the password with bcrypt
    password = await bcrypt.hash(password, 10);

    // create the user || save the user data to the database
    const user = await User.create({
      fullNames,
      email,
      password,
      role,
    });

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const verificationUrl = process.env.VERIFICATION_URL + "?token=" + token;

    const subject = "Welcome to Book_API";
    const text = "Welcome to Book_API";
    const html = emailTemplate(firstName, verificationUrl);

    await sendMail(email, subject, text, html);
    return res.status(201).json({
      message: `Hey ${firstName}, your account has been created successfully`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const token = req.query.token;
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken) return res.status(401).json({ message: "Unauthorized" });
    let user = await User.findById(decodeToken.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (user.isVerified)
      return res
        .status(400)
        .json({ message: "Your account is already verified" });
    user.isVerified = true;
    await user.save();

    return res.redirect(process.env.REDIRECT_URL);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        message: `you don't have an account, please register`,
      });
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "incorrect password" });

    const token = jwt.sign(
      { id: userExist._id, email: userExist.email, role: userExist.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    return res.status(200).json({
      message: "user logged in successfully",
      status: "success",
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist)
      return res
        .status(400)
        .json({ message: "user does not exist, please sign up" });

    const token = jwt.sign(
      { id: userExist._id, email: userExist.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const forgotPasswordLink = `http://localhost:1001/auth/reset-password?token=${token}`;

    const subject = "Password Reset";
    const text = "Reset Your Password";
    const html = `<h1>Hello ${
      userExist.fullNames.split(" ")[0]
    }</h1> <h3>click the link below to reset-password</h3>
    <h3>${forgotPasswordLink}</h3>`;

    await sendMail(userExist.email, subject, text, html);

    return res
      .status(200)
      .json({ message: "password reset link sent to your email" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { newPassword, confirmPassword } = req.body;
  try {
    if (!token) return res.status(400).json({ message: "Invalid request" });
    const validToken = await jwt.verify(token, process.env.JWT_SECRET);

    if (!validToken)
      return res.status(400).json({ message: "token expired or malformed" });

    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .json({ message: "password and confirm password must tally" });

    let user = await User.findById(validToken.id);

    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;

    await user.save();

    return res
      .status(200)
      .json({ message: "password reset successfully", status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyUser,
  forgotPassword,
  resetPassword,
};
