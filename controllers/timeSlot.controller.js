const TimeSlot = require("../models/timeSlot.model.js");

// Get today's slots
exports.getTodaySlots = async (req, res) => {
  try {
    const slots = await TimeSlot.find({ day: "today" });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching today's slots", error });
  }
};

// Get tomorrow's slots
exports.getTomorrowSlots = async (req, res) => {
  try {
    const slots = await TimeSlot.find({ day: "tomorrow" });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tomorrow's slots", error });
  }
};

// Add a new time slot
exports.addTimeSlot = async (req, res) => {
    console.log("hiting")
  try {
    const { day, time } = req.body;

    if (!day || !time) {
      return res.status(400).json({ message: "Day and time are required." });
    }

    const newTimeSlot = new TimeSlot({
      day,
      time,
      isAvailable: true, // By default, new slots are available
    });

    const savedTimeSlot = await newTimeSlot.save();

    res.status(201).json(savedTimeSlot); // 201 Created
  } catch (error) {
    res.status(500).json({ message: "Error adding new time slot", error });
  }
};


// Update availability (true/false)
exports.updateSlot = async (req, res) => {
    
  try {
    const { id } = req.params;

    const { isAvailable } = req.body;
    

    const slot = await TimeSlot.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true }
    );

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: "Error updating slot", error });
  }
};


exports.deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Slot ID is required" });
    }

    const deletedSlot = await TimeSlot.findByIdAndDelete(id);

    if (!deletedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.status(200).json({
      message: "Slot deleted successfully",
      deletedSlot,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting slot",
      error: error.message,
    });
  }
};