const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    const results = await User.aggregate([
      {
        $count: "users",
      },
    ]);

    // const result = await User.countDocuments();

    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
