const express = require('express');
const router = express.Router();
const path = require('path');
const { createUser, getUser, getAllUsers, updateUser, deleteUser, validateUser } = require('../models/users');
const { insertReview } = require('../models/reviews'); 

router.post('/reviews', async (req, res) => {
    const { rating, message } = req.body;

    // Validaciones
    if (!['good', 'neutral', 'bad'].includes(rating)) {
        return res.status(400).json({ error: 'Invalid rating value. Accepted values are: good, neutral, bad.' });
    }

    if (typeof message !== 'string' || message.trim().length === 0 || message.length > 256) {
        return res.status(400).json({ error: 'Message must be a non-empty string and not exceed 256 characters.' });
    }

    try {
        // Llamar a la función insertReview para guardar la reseña en la base de datos
        await insertReview(rating, message);
        res.status(201).json({ message: 'Review created successfully' });
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

module.exports = router;
