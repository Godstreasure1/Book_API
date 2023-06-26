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
  
  try{
    const book = await Book_API.findById(id);
    
    if (!note) {
      return res.status(400).json({ message:`${id} information does not exist`});
  }

   book.author = author;
   await book.save();

   return res.status(201).json ({message: `${id} book updated successfully`, book: book});
} catch (error) {
  if (error.kind ==="objectid") {
    return res.status (400).json({message:`${id} information does not exist`});
  }
  return res.status(500).json({ message:error});

  }

};
  
 
const deleteBookById = async (req, res) => {
//complete this function

}
  

module.exports = {
  addBook,
  getBooks,
  updateBookById,
  deleteBookById,
};
