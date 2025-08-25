const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    default: "admin@example.com",
    unique: true,
    immutable: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

module.exports = mongoose.model("Admin", adminSchema);
