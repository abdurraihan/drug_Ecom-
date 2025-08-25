const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    announcement: {    
        type: String,
        required: true,         
        default: "Announcement"
    },
}, { timestamps: true });

module.exports = mongoose.model("Announcement", announcementSchema);