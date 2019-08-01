const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = new Schema({
  comment: {
    type: String
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment