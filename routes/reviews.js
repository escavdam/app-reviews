const express = require('express');
const router = express.Router();
const path = require('path');
const { insertReview, getReviews } = require('../models/reviews'); 
const db = require('../database');

router.get('/reviews', (req, res) => {
    const resultado = getReviews()
    console.log(resultado)
    res.json(resultado)
});

router.post('/reviews', (req, res) => {
    const { rating, message } = req.body;
    const user = "luisfernandez"
    const now = new Date();
    insertReview("now", rating, message, user)
    res.json({rating, message, user, now})
});

module.exports = router;
