const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  city: String,
  rating: { type: Number, min: 0, max: 5 },
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Hotel", hotelSchema);
