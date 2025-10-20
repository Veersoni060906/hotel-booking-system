const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const model = require('../models/hotelModel');
const { validateHotel } = require('../middlewares/hotelValidation');

router.get('/', (req, res) => res.json(model.getAllHotels()));

router.get('/:id', (req, res) => {
  const hotel = model.getHotelById(req.params.id);
  if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
  res.json(hotel);
});

router.post('/', validateHotel, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const newHotel = model.addHotel(req.body);
  res.status(201).json(newHotel);
});

router.put('/:id', validateHotel, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const updated = model.updateHotel(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Hotel not found' });
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const deleted = model.deleteHotel(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Hotel not found' });
  res.json({ message: 'Hotel deleted successfully' });
});

module.exports = router;
