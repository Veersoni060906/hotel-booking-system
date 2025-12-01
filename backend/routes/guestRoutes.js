const express = require("express");
const router = express.Router();
const controller = require("../controllers/guestController");

router.get("/", controller.getGuests);
router.get("/:id", controller.getGuestById);
router.post("/", controller.createGuest);
router.put("/:id", controller.updateGuest);
router.delete("/:id", controller.deleteGuest);

module.exports = router;
