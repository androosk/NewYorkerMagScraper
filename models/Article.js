const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return Article.find({title: v}).then(documents => !documents.length);
      },
      message: "article already exists"
    },
  },
  link: {
    type: String,
    required: true,
  },
  favorited: {
    type: Array,
    default: []
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
})

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article