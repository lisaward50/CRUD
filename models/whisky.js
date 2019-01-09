const mongoose = require("mongoose");

const whiskySchema = new mongoose.Schema({
  name: String,
  image: String,
  origin: String,
  type: String,
  summary: String,
  description: String
});

const Whisky = mongoose.model("Whisky", whiskySchema);

module.exports = Whisky;
