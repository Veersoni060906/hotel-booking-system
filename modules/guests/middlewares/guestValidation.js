const { body } = require('express-validator');

exports.validateGuest = [
  body('id').notEmpty().withMessage('ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').notEmpty().withMessage('Phone number required')
];
