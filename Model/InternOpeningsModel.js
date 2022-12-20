const mongoose = require("mongoose");
const InternshipModel = mongoose.Schema({
  Image: { type: String, required: true },
  title: { type: String, required: true },
  OpeningDetails: { type: String, required: true },
});
exports.Internship = mongoose.model("Internship", InternshipModel);

const InternApplyModel = mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  ContactNumber: { type: Number, required: true },
  College: { type: String, required: true },
  Branch: { type: String, required: true },
  PassoutYear: { type: Number, required: true },
  OpeningTitle: { type: String, required: true },
  Resume: { type: String, required: true },
});
exports.InternApply = mongoose.model("InternApply", InternApplyModel);
