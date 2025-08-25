const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["today", "tomorrow"],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("TimeSlot", timeSlotSchema);
