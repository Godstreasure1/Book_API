const express = require("express");
const {
  addBook,
  getBooks,
  getAuthorBooks,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");

const validateInput = require("../middleware/validation");
const isAuth = require("../middleware/auth");

const router = express.Router();

router.get("/books", isAuth, getBooks);
router.get("/book", isAuth, getAuthorBooks);
router.post("/book", isAuth, validateInput, addBook);
router.put("/book/:id", isAuth, updateBook);
router.delete("/book/:id", isAuth, deleteBook);

module.exports = router;
