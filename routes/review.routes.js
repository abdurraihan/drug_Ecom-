const express = require('express');
const router = express.Router();
const { submitReview, getReviews, approveReview , getApprovedReviews} = require('../controllers/review.controller.js');

// Middleware for image upload
const upload = require('../middleware/multer.js'); 

// Post a review with an image
router.post('/submit', upload.single('image'), submitReview);

// Get all reviews (admin can approve/reject)
router.get('/allreview', getReviews);

router.get('/approvedreview',getApprovedReviews)

// Admin approves or rejects a review
router.patch('/approve/:reviewId', approveReview);

module.exports = router;
