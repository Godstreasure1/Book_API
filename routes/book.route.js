const express = require("express");
const {
  addBook,
  getBooks,
  updateBookById,
  deleteBookById,
} = require("../controllers/book.controller");

const validateInput = require("../middleware/validation");

const router = express.Router();

router.get("/book", getBooks);
router.post("/book", validateInput, addBook);
router.put("/book/:id", updateBookById);
router.delete("/book/:id", deleteBookById);

module.exports = router;
