const mongoose = require("mongoose");
const PartnersModel = mongoose.Schema({
  Image: { type: String, required: true },
  Name: { type: String, required: true },
  Link: { type: String, required: true },
  Title: { type: String, required: true },
});
exports.Partners = mongoose.model("Partners", PartnersModel);
