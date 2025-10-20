const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const model = require('../models/bookingModel');
const { validateBooking } = require('../middlewares/bookingValidation');

router.get('/', (req, res) => res.json(model.getAllBookings()));

router.get('/:id', (req, res) => {
  const booking = model.getBookingById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
});

router.post('/', validateBooking, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const booking = model.addBooking(req.body);
  if (!booking) return res.status(400).json({ message: 'Room unavailable or invalid' });
  res.status(201).json(booking);
});

router.delete('/:id', (req, res) => {
  const deleted = model.deleteBooking(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Booking not found' });
  res.json({ message: 'Booking deleted successfully' });
});

module.exports = router;
