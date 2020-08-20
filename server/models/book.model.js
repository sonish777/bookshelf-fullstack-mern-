const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    author: {
      type: String,
      required: [true, "Name is required"],
    },
    review: {
      type: String,
      default: "n/a",
    },
    pages: {
      type: String,
      default: "n/a",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    price: {
      type: String,
      default: "n/a",
    },
    ownerId: {
      type: String,
      required: [true, "Owner id is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
