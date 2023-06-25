const validateInput = (req, res, next) => {
  const { author, title, description } = req.body;

  if (!author || typeof author !== "string") {
    return res
      .status(400)
      .json({ message: "Author is required and must be a string" });
  }
  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ message: "title is required and must be a string" });
  }
  if (!description || typeof description !== "string") {
    return res
      .status(400)
      .json({ message: "description is required and must be a string" });
  }

  next();
};

module.exports = validateInput;
