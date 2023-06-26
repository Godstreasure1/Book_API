const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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

module.exports = register;
