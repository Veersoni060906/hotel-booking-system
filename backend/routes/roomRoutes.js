const express = require("express");
const router = express.Router();
const controller = require("../controllers/roomController");

router.get("/", controller.getRooms);
router.get("/:id", controller.getRoomById);
router.post("/", controller.createRoom);
router.put("/:id", controller.updateRoom);
router.delete("/:id", controller.deleteRoom);

module.exports = router;
