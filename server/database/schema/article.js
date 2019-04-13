const mongoose = require("mongoose")
const Schema = mongoose.Schema
const article = new Schema({
  title: String,
  content: String,
  thumb: String,
  author: String,
  createTime: String,
  updateTime: String,
  hits: Number,
  praise: Number,
  onTop: Boolean,
  onHot: Boolean,
  onDisplay: Boolean
})
mongoose.model("article", article)
