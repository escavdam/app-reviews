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
    const { rating, message, user: providedUser } = req.body; // Agregar el campo 'user' de req.body
    const user = providedUser || "Anonymous"; // Usar el valor proporcionado o un valor predeterminado
    const now = new Date();

    insertReview(now.toISOString(), rating, message, user);  // Guardamos la fecha en formato ISO

    res.json({
        rating,
        message,
        user,
        time: now.toISOString()  // Enviamos la fecha como una cadena ISO
    });
});



module.exports = router;
