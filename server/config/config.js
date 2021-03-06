const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: "secretpassword..123@",
    DATABASE: "mongodb://localhost:27017/books_shelf",
  },
};

module.exports.get = (env) => {
  return config[env] || config.default;
};
