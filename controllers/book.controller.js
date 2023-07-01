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
  const userId = req.user.id;
  try {
    const books = await Book.find().populate({
      path: "userId",
      options: {
        select: ["fullNames", "email", "_id"],
      },
    });
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateBookById = async (req, res) => {
  // complete this function
};

const deleteBookById = async (req, res) => {
  const id = req.params.id;
  try {
    await Book.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addBook,
  getBooks,
  updateBookById,
  deleteBookById,
};
