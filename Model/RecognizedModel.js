const mongoose = require("mongoose");

const RecognizersModel = mongoose.Schema({
  Image: { type: String, required: true },
  Name: { type: String, required: true },
  Link: { type: String, required: true },
  Title: { type: String, required: false },
});
exports.Recognizers = mongoose.model("Recognizers", RecognizersModel);
