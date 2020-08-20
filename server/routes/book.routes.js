const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");

router.route("/").post(bookController.postBook).get(bookController.getBooks);

router.route("/reviewer").get(bookController.getReviewer);

router
  .route("/:id")
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
