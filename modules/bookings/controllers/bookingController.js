const Booking = require('../models/bookingModel');
const Room = require('../../rooms/models/roomModel');

// Create a booking
exports.addBooking = async (req, res) => {
  try {
    const { guest, room, checkIn, checkOut, totalPrice } = req.body;

    const roomDoc = await Room.findById(room);
    if (!roomDoc || !roomDoc.available) {
      return res.status(400).json({ message: 'Room not available' });
    }

    roomDoc.available = false;
    await roomDoc.save();

    const booking = await Booking.create({ guest, room, checkIn, checkOut, totalPrice });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const bookings = await Booking.find()
      .populate('guest')
      .populate('room')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('guest').populate('room');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const roomDoc = await Room.findById(booking.room);
    if (roomDoc) {
      roomDoc.available = true;
      await roomDoc.save();
    }

    await booking.remove();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
