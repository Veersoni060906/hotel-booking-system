const { body } = require('express-validator');

exports.validateBooking = [
  body('id').notEmpty().withMessage('Booking ID is required'),
  body('roomId').notEmpty().withMessage('Room ID is required'),
  body('guestName').notEmpty().withMessage('Guest name is required'),
  body('checkInDate').isISO8601().withMessage('Valid check-in date required'),
  body('checkOutDate').isISO8601().withMessage('Valid check-out date required')
];
