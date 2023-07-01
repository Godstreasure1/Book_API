const express = require("express");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../middleware/auth.validation");
const { register, login } = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);

module.exports = router;
