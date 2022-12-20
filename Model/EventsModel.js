const mongoose = require("mongoose");
const EventsModel = mongoose.Schema({
  // Image:{type:String,required:true},
  Images: [
    {
      type: String,
      // required: true,
    },
  ],
  title: { type: String, required: true },
  Date: { type: String, required: true },
});
exports.Events = mongoose.model("Events", EventsModel);
