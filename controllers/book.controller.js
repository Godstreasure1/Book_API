const Book = require("../models/book.model");
const User = require("../models/user.model");

const addBook = async (req, res) => {
  // destructuring
  const { title, description, publishDate } = req.body;
  const userId = req.user.id;
  try {
    const book = await Book.create({
      title,
      description,
      publishDate,
      userId,
    });

    const user = await User.findById(userId);

    user.bookIds.push(book._id);
    // [...user.bookIds, book._id]

    await user.save();

    return res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate({
      path: "userId",
      options: {
        select: { fullNames: 1, email: 1 },
      },
    });
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAuthorBooks = async (req, res) => {
  const userId = req.user.id;
  try {
    const book = await Book.find({ userId }).populate({
      path: "userId",
      options: {
        select: "fullNames email",
      },
    });

    return res.status(200).json({ book });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  const userId = req.user.id;
  const { title, description, publishDate } = req.body;
  try {
    const book = await Book.findOne({ userId });

    if (title) book.title = title;

    if (description) book.description = description;

    if (publishDate) book.publishDate = publishDate;

    await book.save();

    return res.status(201).json({ message: `book updated successfully`, book });
  } catch (error) {
    if (error.kind === "objectid") {
      return res
        .status(400)
        .json({ message: `${id} information does not exist` });
    }
    return res.status(500).json({ message: error });
  }
};

const deleteBook = async (req, res) => {
  const userId = req.user.id;
  try {
    await Book.findOneAndDelete({ userId });
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    if (error.kind === "objectid") {
      return res
        .status(400)
        .json({ message: `${id} information does not exist` });
    }
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  addBook,
  getBooks,
  getAuthorBooks,
  updateBook,
  deleteBook,
};
