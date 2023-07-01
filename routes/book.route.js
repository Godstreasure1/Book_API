const express = require("express");
const {
  addBook,
  getBooks,
  updateBookById,
  deleteBookById,
} = require("../controllers/book.controller");

const validateInput = require("../middleware/validation");
const isAuth = require("../middleware/auth");

const router = express.Router();

router.get("/book", isAuth, getBooks);
router.post("/book", isAuth, validateInput, addBook);
router.put("/book/:id", isAuth, updateBookById);
router.delete("/book/:id", isAuth, deleteBookById);

module.exports = router;
