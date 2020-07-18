const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  email: String,
  password: String,
  name: String,
  phno: String,
  city: String,
  education: Array,
  internships: Array,
  courses: Array,
  skills: Array,
  github: String,
  age: String,
});

module.exports = mongoose.model("User", userSchema);
