const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcement.controller");

router.get("/", announcementController.getAnnouncement);
router.put("/", announcementController.updateAnnouncement);

module.exports = router;
