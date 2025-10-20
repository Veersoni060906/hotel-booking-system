const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const model = require('../models/guestModel');
const { validateGuest } = require('../middlewares/guestValidation');

router.get('/', (req, res) => res.json(model.getAllGuests()));

router.get('/:id', (req, res) => {
  const guest = model.getGuestById(req.params.id);
  if (!guest) return res.status(404).json({ message: 'Guest not found' });
  res.json(guest);
});

router.post('/', validateGuest, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const newGuest = model.addGuest(req.body);
  res.status(201).json(newGuest);
});

router.put('/:id', validateGuest, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const updated = model.updateGuest(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Guest not found' });
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const deleted = model.deleteGuest(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Guest not found' });
  res.json({ message: 'Guest deleted successfully' });
});

module.exports = router;
