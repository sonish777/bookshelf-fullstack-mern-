const User = require("../models/user.model");
const Book = require("../models/book.model");

module.exports.postUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid email or password",
    });
  }

  if (!(await user.comparePassword(req.body.password))) {
    return res.status(200).json({
      status: "fail",
      message: "Invalid email or password",
    });
  }

  const token = await user.generateToken();
  //   console.log("TOKEN IS", token);

  if (!token)
    return res.status(400).json({
      status: "fail",
      message: "Token could not be created",
    });

  user.token = token;
  try {
    await user.save();
    res.cookie("auth", user.token);
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports.getUserPosts = async (req, res, next) => {
  try {
    const books = await Book.find({ ownerId: req.query.user });
    res.status(200).json({
      status: "success",
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports.auth = async (req, res, next) => {
  let token = req.cookies.auth;
  try {
    const user = await User.findByToken(token);
    if (!user)
      return res.json({
        status: "fail",
        message: "No user found",
      });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports.logout = async (req, res, next) => {
  await req.user.deleteToken(req.token);
  res.status(200).json({
    status: "success",
  });
};

module.exports.getAuth = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
  });
};
