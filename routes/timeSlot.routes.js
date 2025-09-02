const express = require("express");
const router = express.Router();
const controller = require("../controllers/timeSlot.controller.js");
const {verifyAdmin} = require("../middleware/authMiddleware")

router.post("/add",verifyAdmin,controller.addTimeSlot)
router.get("/today", controller.getTodaySlots);
router.get("/tomorrow", controller.getTomorrowSlots);
router.put("/:id",verifyAdmin, controller.updateSlot);

module.exports = router;
