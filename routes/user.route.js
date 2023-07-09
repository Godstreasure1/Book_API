const express = require("express");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../middleware/auth.validation");
const {
  register,
  login,
  verifyUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controller");
const { getAllUsers } = require("../controllers/admin.controller");
const { isAuth, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/register", validateRegisterInput, register);
router.get("/verify", verifyUser);
router.post("/login", validateLoginInput, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/admin", isAuth, isAdmin, getAllUsers);

module.exports = router;
