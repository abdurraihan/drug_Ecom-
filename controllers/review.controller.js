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
    // Get page and limit from query params, default to page 1 and 10 items per page
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch reviews with pagination
    const reviews = await Review.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional: latest first

    // Total number of reviews
    const totalReviews = await Review.countDocuments();

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalReviews / limit),
      totalReviews,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

module.exports = { getReviews };


// Admin approves or rejects a review

const approveReview = async (req, res) => {
  const { reviewId } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Must be "approved" or "rejected".' });
  }

  try {
    if (status === 'approved') {
      // Update review status
      const review = await Review.findByIdAndUpdate(
        reviewId,
        { status },
        { new: true }
      );

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      return res.status(200).json({ message: 'Review approved', review });
    }

    if (status === 'rejected') {
      // Delete the review
      const review = await Review.findByIdAndDelete(reviewId);

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      return res.status(200).json({ message: 'Review rejected and deleted', review });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error processing review', error });
  }
};

const getApprovedReviews = async (req, res) => {
  try {

     const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Find reviews where the status is "approved"
    const approvedReviews = await Review.find({ status: 'approved' }).skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });;

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
