const mongoose = require("mongoose");
const TeamModel = mongoose.Schema({
  Name: { type: String, required: true },
  Position: { type: String, required: true },
  Image: { type: String, required: true },
  LinkedIN: { type: String, required: true },
});
exports.Team = mongoose.model("Team", TeamModel);
