const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const model = require('../models/roomModel');
const { validateRoom } = require('../middlewares/roomValidation');

router.get('/', (req, res) => res.json(model.getAllRooms()));

router.get('/:id', (req, res) => {
  const room = model.getRoomById(req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json(room);
});

router.post('/', validateRoom, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const newRoom = model.addRoom(req.body);
  res.status(201).json(newRoom);
});

router.put('/:id', validateRoom, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const updated = model.updateRoom(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Room not found' });
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const deleted = model.deleteRoom(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Room not found' });
  res.json({ message: 'Room deleted successfully' });
});

module.exports = router;
