const express = require('express');
const router = express.Router();
const path = require('path');
const { createUser, getUser, getAllUsers, updateUser, deleteUser, validateUser, insertReview } = require('../database');

router.post('/users', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    try {
        createUser(user, password);
        res.status(201).send('Usuario creado');
    } catch (err) {
        res.status(500).send("Error al crear el usuario");
    }
});

router.get('/users', (req, res) => {
    res.json(getAllUsers());
});

router.get('/users/:user', (req, res) => {
    const user = req.params.user;
    const userObj = getUser(user);
    if (userObj) {
        res.json(userObj);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

router.put('/users/:user', (req, res) => {
    const user = req.params.user;
    const password = req.body.password;
    try {
        updateUser(user, password);
        res.status(200).send('Usuario actualizado');
    } catch (err) {
        res.status(500).send('Error al actualizar el usuario');
    }
});

router.delete('/users/:user', (req, res) => {
    const user = req.params.user;
    try {
        deleteUser(user);
        res.status(200).send('Usuario eliminado');
    } catch (err) {
        res.status(500).send('Error al eliminar el usuario');
    }
});

router.post('/register', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const userObj = getUser(user);
    if (userObj) {
        const response = {
            user: user,
            error: "Ya hay un usuario con ese nombre"
        }
        res.status(409).send(response);
    } else {
        createUser(user, password);
        const response = {
            user: user,
            message: "Usuario creado"
        }
        res.status(201).send(response);
    }
});

router.get("/perfil", (req, res) => {
    if (req.session.user) {
        const response = {
            user: req.session.user,
            //isAdmin: req.session.isAdmin
        }
        res.status(200).send(response);
    } else {
        res.status(401).send('Debes hacer login');
    }
});

router.post('/login', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const userObj = getUser(user);

    if (userObj && validateUser(user, password)) {
        req.session.user = user; // Guarda el usuario en la sesión
        req.session.isAdmin = userObj.role === 'admin';
        res.cookie('sessionId', req.sessionID, { httpOnly: true, secure: true });
        response = {
            user: user,
            message: 'Login correcto'
        }
        res.status(200).send(response);
    } else {
        response = {
            user: user,
            error: 'Login incorrecto'
        }
        res.status(401).send(response);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).redirect('/login.html');
});

router.post('/reviews', (req, res) => {
    const { rating, message } = req.body;

    // Validaciones
    if (!['good', 'neutral', 'bad'].includes(rating)) {
        return res.status(400).send({ error: 'Invalid rating value' });
    }

    if (typeof message !== 'string' || message.length > 256) {
        return res.status(400).send({ error: 'Message exceeds character limit' });
    }

    try {
        // Llamar a la función insertReview para guardar la reseña en la base de datos
        insertReview(rating, message);
        res.status(201).send({ message: 'Review created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error creating review' });
    }
});

module.exports = router;

