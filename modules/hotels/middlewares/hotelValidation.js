const { body } = require('express-validator');

exports.validateHotel = [
  body('id').notEmpty().withMessage('ID is required'),
  body('name').notEmpty().withMessage('Hotel name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
];
