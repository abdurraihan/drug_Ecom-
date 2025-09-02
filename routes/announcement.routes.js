const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcement.controller");
const {verifyAdmin} = require("../middleware/authMiddleware")

router.get("/", announcementController.getAnnouncement);
router.put("/",verifyAdmin, announcementController.updateAnnouncement);

module.exports = router;
