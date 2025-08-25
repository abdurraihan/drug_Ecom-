const Announcement = require("../models/announcement.model");

// GET the current announcement
exports.getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findOne();
    if (!announcement) {
      return res.status(404).json({ message: "No announcement found." });
    }
    res.json(announcement);
  } catch (error) {
    console.error("❌ Get announcement error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT: update the existing announcement or create if it doesn't exist
exports.updateAnnouncement = async (req, res) => {
  try {
    const { announcement } = req.body;

    if (!announcement) {
      return res.status(400).json({ message: "Announcement text is required." });
    }

    const existing = await Announcement.findOne();

    if (existing) {
      existing.announcement = announcement;
      await existing.save();
      return res.json({ message: "Announcement updated.", data: existing });
    } else {
      const newAnnouncement = new Announcement({ announcement });
      await newAnnouncement.save();
      return res.status(201).json({ message: "Announcement created.", data: newAnnouncement });
    }
  } catch (error) {
    console.error("❌ Update announcement error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
