const express = require("express");
const validateUser = require("../middleware/auth.validation");
const register = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", validateUser, register);

module.exports = router;
