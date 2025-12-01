const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
