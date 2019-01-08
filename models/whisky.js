const mongoose = require("mongoose");

const whiskySchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String
});

const Whisky = mongoose.model("Whisky", whiskySchema);

module.exports = Whisky;
