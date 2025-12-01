const express = require("express");
const router = express.Router();
const controller = require("../controllers/hotelController");

router.get("/", controller.getHotels);
router.get("/:id", controller.getHotelById);
router.post("/", controller.createHotel);
router.put("/:id", controller.updateHotel);
router.delete("/:id", controller.deleteHotel);

module.exports = router;
