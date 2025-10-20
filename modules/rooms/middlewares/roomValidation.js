const { body } = require('express-validator');

exports.validateRoom = [
  body('id').notEmpty().withMessage('ID is required'),
  body('hotelId').notEmpty().withMessage('Hotel ID is required'),
  body('type').notEmpty().withMessage('Room type is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('isAvailable').isBoolean().withMessage('isAvailable must be true or false')
];
