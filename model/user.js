let mongoose = require("mongoose")

let exerciseSchema = new mongoose.Schema({
  description: {type: String, required: true},
  duration: Number,
  date: {type: Date, default: Date("1999-20-03")}
})

let userSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  exercise: [exerciseSchema]
})

module.exports = mongoose.model("User", userSchema)
// mongoose.model("User", userSchema)