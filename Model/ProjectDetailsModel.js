const mongoose = require("mongoose");
const ProjectDetailsModel = mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  ContactNumber: { type: Number, required: true },
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Deadline: { type: String, required: true },
  SRS: { type: String, required: true },
});
exports.ProjectDetails = mongoose.model("ProjectDetails", ProjectDetailsModel);
