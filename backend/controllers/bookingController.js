const Booking = require("../models/Booking");
const Room = require("../models/Room");

// GET all bookings (populated)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("guest", "name email phone")
      .populate("hotel", "name city")
      .populate("room", "roomNumber type price");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("guest", "name email phone")
      .populate("hotel", "name city")
      .populate("room", "roomNumber type price");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { guest, hotel, room, checkIn, checkOut } = req.body;
    if (!guest || !hotel || !room || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const roomDoc = await Room.findById(room);
    if (!roomDoc) return res.status(400).json({ message: "Invalid room" });
    if (!roomDoc.available) return res.status(400).json({ message: "Room not available" });

    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const msPerDay = 24 * 60 * 60 * 1000;
    const nights = Math.ceil((d2 - d1) / msPerDay);
    if (nights <= 0) return res.status(400).json({ message: "Invalid dates" });

    const totalPrice = nights * (roomDoc.price || 0);

    const booking = await Booking.create({ guest, hotel, room, checkIn: d1, checkOut: d2, totalPrice });

    // mark room unavailable
    roomDoc.available = false;
    await roomDoc.save();

    const populated = await Booking.findById(booking._id)
      .populate("guest", "name email phone")
      .populate("hotel", "name city")
      .populate("room", "roomNumber type price");

    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("guest", "name email phone")
      .populate("hotel", "name city")
      .populate("room", "roomNumber type price");
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // free room on delete
    const roomDoc = await Room.findById(booking.room);
    if (roomDoc) {
      roomDoc.available = true;
      await roomDoc.save();
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
