const Guest = require('../models/guestModel');

// Create a new guest
exports.createGuest = async (req, res) => {
  try {
    const guest = await Guest.create(req.body);
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all guests with optional pagination and search
exports.getGuests = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, email } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (email) query.email = email;

    const guests = await Guest.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a guest by ID
exports.getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a guest
exports.updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json(guest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a guest
exports.deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json({ message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
