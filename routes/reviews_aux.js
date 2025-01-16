const express = require('express');
const router = express.Router();
const path = require('path');
const { insertReview, getReviews } = require('../models/reviews'); 
const db = require('../database');


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
        // Obtener el usuario de la sesión
        const user = 'luisfernandez'

        // Añadir la fecha actual en formato "día/mes/año hora:minutos"
        const now = new Date();
        const currentDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        // Llamar a la función insertReview para guardar la reseña en la base de datos
        console.log('Inserting review:', rating, message, user, currentDate);
        insertReview(currentDate, rating, message, user);
        res.status(201).json({ message: 'Review created successfully' });
    } catch (err) {
        console.error('Error creating review');
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});



router.get('/reviews', (req, res) => {
    try {
        const consulta = db.prepare("SELECT * FROM reviews");
        const reviews = consulta.all();
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener las reviews");
    }
});
// Ruta para obtener todas las reseñas (rating y message) desde la base de datos
router.get("/api/reviews", (req, res) => {
    try {
        // Consulta SQL para obtener solo los campos 'rating' y 'message' de la tabla 'reviews'
        const consulta = db.prepare("SELECT rating, message FROM reviews");
        const reviews = consulta.all();  // Ejecuta la consulta y obtiene todas las reseñas

        // Verificamos si hay reseñas en la base de datos
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No se encontraron reseñas en la base de datos" });
        }

        // Si existen reseñas, las devolvemos en formato JSON
        res.json(reviews);  // Devolvemos las reseñas como respuesta

    } catch (error) {
        // En caso de error, se captura y responde con un mensaje de error
        console.error(error);
        res.status(500).json({ error: "Error al obtener las reseñas de la base de datos" });
    }
});
router.get('/reviews/:id', (req, res) => {
    const id = req.params.id;

    // Verificar si el usuario está autenticado y si es administrador
    if (req.session.user && req.session.isAdmin) {
        try {
            const stmt = db.prepare("SELECT * FROM reviews WHERE id = ?");
            const review = stmt.get(id);

            if (review) {
                res.status(200).json(review);
            } else {
                res.status(404).send('Review no encontrada');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al obtener la review");
        }
    } else {
        res.status(403).json({ message: 'Acceso denegado: Solo administradores' });
    }
});
router.get('/reviews', (req, res) => {
    try {
        const consulta = db.prepare("SELECT * FROM reviews");
        const reviews = consulta.all();
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener las reviews");
    }
});

module.exports = router;
