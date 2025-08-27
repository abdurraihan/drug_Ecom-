const Review = require('../models/review.model.js')

// Submit a review with image
const submitReview = async (req, res) => {
  try {
    const { rating, description, date, clientName } = req.body;

    // Check if an image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required!' });
    }

   const url = `${process.env.FTP_PUBLIC_URL}/${req.file.filename}`;
  
    // Create and save the review
    const newReview = new Review({
      rating,
      description,
      date,
      clientName, // Name of the client submitting the review
      image: url, // Save image path in DB
    });

    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully!', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Error while submitting the review', error });
  }
};

// Get all reviews (for admin panel or other users)
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Admin approves or rejects a review
const approveReview = async (req, res) => {
  const { reviewId } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Must be "approved" or "rejected".' });
  }

  try {
    const review = await Review.findByIdAndUpdate(reviewId, { status }, { new: true });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review status updated', review });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review status', error });
  }
};

const getApprovedReviews = async (req, res) => {
  try {
    // Find reviews where the status is "approved"
    const approvedReviews = await Review.find({ status: 'approved' });

    // Return the approved reviews in the response
    res.status(200).json(approvedReviews);
  } catch (error) {
    // If there's an error, send a response with a 500 status code
    res.status(500).json({ message: 'Error fetching approved reviews', error });
  }
};


module.exports = {
  submitReview,
  getReviews,
  approveReview,
  getApprovedReviews
};
