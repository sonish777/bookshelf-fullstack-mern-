const Book = require("../models/book.model");
const User = require("../models/user.model");

module.exports.postBook = async (req, res, next) => {
  const book = new Book(req.body);

  try {
    const doc = await book.save();
    res.status(200).json({
      status: "success",
      book: doc,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};

module.exports.getBook = async (req, res, next) => {
  let id = req.params.id;

  try {
    const book = await Book.findById(id);
    res.status(200).json({
      status: "success",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};

module.exports.getBooks = async (req, res, next) => {
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  try {
    const books = await Book.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit);

    res.status(200).json({
      status: "success",
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

module.exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

module.exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    res.status(204).json({
      status: "success",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

module.exports.getReviewer = async (req, res, next) => {
  let id = req.query.id;
  // console.log(id);
  try {
    const user = await User.findById(id);
    res.status(200).json({
      status: "success",
      firstname: user.firstname,
      lastname: user.lastname,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
