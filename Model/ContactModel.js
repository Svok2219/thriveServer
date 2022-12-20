const mongoose = require("mongoose");
const ContactModel = mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  ContactNumber: { type: Number, required: true },
  Query: { type: String, required: true },
  College: { type: String, required: true },
  Branch: { type: String, required: true },
  PassoutYear: { type: String, required: true },
});
exports.Contact = mongoose.model("Contact", ContactModel);
