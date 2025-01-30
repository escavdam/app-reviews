const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const path = require('path');
const { createUser, getUser, getAllUsers, updateUser, deleteUser, validateUser } = require('../models/users');

/*
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

router.get('/reviews/:id', (req, res) => {
    const id = req.params.id;

    // Verificar si el usuario está autenticado y si es administrador
    if (req.session.user && req.session.isAdmin) {
        try {
            const consulta = db.prepare("SELECT * FROM reviews WHERE id = ?");
            const review = consulta.get(id);

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
*/
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

router.get("/perfil",  authMiddleware ,(req, res) => {
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

router.get("/surveys",  authMiddleware ,(req, res) => {
    res.sendFile(__dirname + '/public/surveys.html');
    res.status(200).send(response);
});

router.post('/login', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const userObj = getUser(user);

    if (userObj && validateUser(user, password)) {
        req.session.user = user; // Guarda el usuario en la sesión
        if (userObj.username  === 'admin' && userObj.password === '$2b$10$w0.NRKi/vPsV8py49sD34.G4xY6np7aQjB4BHmBkZGDrL7zSAVY3m') {  // Compara si el usuario que está intentando acceder es el admin
            req.session.isAdmin = userObj.role === 'admin'; // Asignamos el rol de admin
        } else {
            console.log("No tienes acceso como administrador.");
            //req.session.isAdmin = false; // Asignamos false si no es admin
        }
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
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.clearCookie('connect.sid'); // Asegúrate de limpiar la cookie de sesión
        res.status(200).redirect('/logout.html');
    });
});





module.exports = router;

