const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    image: {
      type: String,
      required: true, // Ensure image is required
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Rating from 1 to 5
    },
    description: {
      type: String,
      required: true, // Review description
    },
    date: {
      type: String,
      required: true, // Date in string format
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending', // Initial status is pending
    },
    clientName: {
      type: String,
      required: true, // Name of the person submitting the review
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
