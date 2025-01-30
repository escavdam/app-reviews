// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { getAllReviews, addReview } = require('../models/review');

// GET /reviews - Get all reviews
router.get('/', (req, res) => {
    const reviews = getAllReviews();
    res.status(200).json(reviews);
});

// POST /reviews - Add a new review
router.post('/', (req, res) => {
    const { rating, message } = req.body;

    if (!rating || !message) {
        return res.status(400).json({ error: 'Rating and message are required' });
    }

    const newReview = addReview(rating, message);
    res.status(201).json(newReview);
});

module.exports = router;
