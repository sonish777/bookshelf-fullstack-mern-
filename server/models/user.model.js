const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config").get(process.env.NODE_ENV);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Requires more than 6 characters"],
  },
  firstname: {
    type: String,
    maxlength: [100, "Max length is 100"],
  },
  lastname: {
    type: String,
    maxlength: [100, "Max length is 100"],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = async function () {
  let token = jwt.sign(this._id.toHexString(), config.SECRET);
  return token;
};

userSchema.methods.deleteToken = async function (token) {
  this.token = null;
  const user = await this.save();
  return user;
};

userSchema.statics.findByToken = async function (token) {
  // console.log("STATIC");
  // let user = this;
  // console.log(token);
  try {
    const decode = jwt.verify(token, config.SECRET);
    const user = await this.findOne({ _id: decode, token: token });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
