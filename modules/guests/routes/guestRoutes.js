const express = require('express');
const router = express.Router();
const { createGuest, getGuests, getGuestById, updateGuest, deleteGuest } = require('../controllers/guestController');

router.post('/', createGuest);
router.get('/', getGuests);
router.get('/:id', getGuestById);
router.put('/:id', updateGuest);
router.delete('/:id', deleteGuest);

module.exports = router;
