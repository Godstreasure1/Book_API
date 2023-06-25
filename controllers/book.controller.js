const Book = require("../models/book.model");

const addBook = async (req, res) => {
  // destructuring
  const { author, title, description, publishDate } = req.body;

  if (!author || !title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const book = await Book.create({
      author,
      title,
      description,
      publishDate,
    });

    return res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getBooks = async (_, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateBookById = async (req, res) => {
  // complete this function
};

const deleteBookById = async (req, res) => {
  // complete this function
  app.delete("/delete/:_id",async (req, resp) =>{
    console.log(req.params)
  })
};

module.exports = {
  addBook,
  getBooks,
  updateBookById,
  deleteBookById,
};
