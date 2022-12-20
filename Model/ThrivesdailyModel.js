const mongoose = require("mongoose");
const BlogModel = mongoose.Schema({
  Writer: { type: String, required: true },
  Title: { type: String, required: true },
  Date: { type: String, required: true },
  Blog: { type: String, required: true },
});
exports.Blog = mongoose.model("Blog", BlogModel);
