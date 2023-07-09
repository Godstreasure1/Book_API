const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized 🔒🔒🔒" });

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken)
      return res.status(401).json({ message: "Unauthorized 🔒🔒🔒" });

    req.user = decodeToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized 🔒🔒🔒" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden, You are not an Admin" });

  next();
};

module.exports = {
  isAuth,
  isAdmin,
};
