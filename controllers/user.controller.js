const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  let { fullNames, email, password } = req.body;

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
    await User.create({
      fullNames,
      email,
      password,
    });

    return res.status(201).json({
      message: `Hey ${firstName}, your account has been created successfully`,
    });
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
      { id: userExist._id, email: userExist.email },
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
module.exports = {
  register,
  login,
};
