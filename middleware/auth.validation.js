const validateRegisterInput = (req, res, next) => {
  let { fullNames, email, password } = req.body;

  switch (true) {
    case !fullNames || typeof fullNames !== "string" || fullNames.length < 4:
      return res.status(400).json({
        message: "full names is required and must be  string and must be valid",
      });
    case !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      return res
        .status(400)
        .json({ message: "email is required and must be a string" });
    case !password || typeof password !== "string" || password.length < 5:
      return res.status(400).json({
        message: "password is required and must be more 4 characters",
      });
    default:
      next();
  }
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "email is required" });
  if (!password)
    return res.status(400).json({ message: "password is required" });
  next();
};
module.exports = {
  validateRegisterInput,
  validateLoginInput,
};
