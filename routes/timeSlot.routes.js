const express = require("express");
const router = express.Router();
const controller = require("../controllers/timeSlot.controller.js");

router.post("/add",controller.addTimeSlot)
router.get("/today", controller.getTodaySlots);
router.get("/tomorrow", controller.getTomorrowSlots);
router.put("/:id", controller.updateSlot);

module.exports = router;
