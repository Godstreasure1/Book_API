const express = require("express");
const {
  addBook,
  getBooks,
  updateBookById,
  deleteBookById,
} = require("../controllers/book.controller");

const router = express.Router();

router.get("/book", getBooks);
router.post("/book", addBook);
router.put("/book/:id", updateBookById);
router.delete("/book/:id", deleteBookById);

module.exports = router;
