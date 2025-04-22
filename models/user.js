const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)){
        throw new Error("gender data is not valid")
      }
    },
  },
  age: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  about: {
    type: String,
    default: "this is all about  about us section",
  },
  skills: {
    type: [String],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
