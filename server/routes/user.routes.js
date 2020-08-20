const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.route("/").post(userController.postUser).get(userController.getUsers);
router.route("/login").post(userController.login);
router.route("/logout").get(userController.auth, userController.logout);
router.route("/posts").get(userController.getUserPosts);

router.route("/auth").get(userController.auth, userController.getAuth);

module.exports = router;
