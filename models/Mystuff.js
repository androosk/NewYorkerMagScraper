const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MyStuffSchema = new Schema({
  title: {
    type: String
  },
  link: {
    type: String
  },
  comment: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const MyStuff = mongoose.model("Mystuff", MyStuffSchema)
module.exports = MyStuff