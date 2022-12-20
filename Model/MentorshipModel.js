const mongoose = require("mongoose");
const MentorshipModel = mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  ContactNumber: { type: Number, required: true },
  College: { type: String, required: true },
  Branch: { type: String, required: true },
  PassoutYear: { type: Number, required: true },
  FormProvider: { type: String, required: true },
});
exports.Mentorship = mongoose.model("Mentorship", MentorshipModel);

const MentorshipProgramModel = mongoose.Schema({
  Image: { type: String, required: true },
  title: { type: String, required: true },
  PriceDetail: { type: String, required: true },
});
exports.MentorshipProgram = mongoose.model(
  "MentorshipProgram",
  MentorshipProgramModel
);
