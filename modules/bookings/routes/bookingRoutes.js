const express = require('express');
const router = express.Router();

// This path must point exactly to the controller file
const { addBooking, getAllBookings, getBookingById, deleteBooking } = require('../controllers/bookingController');

router.post('/', addBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.delete('/:id', deleteBooking);

module.exports = router;
