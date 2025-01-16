const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const session = require('express-session');
const noob_helper = require("./noob_helper.js"); // Si lo necesitas

// Middleware para servir archivos est�ticos (como im�genes, CSS, etc.)
app.use(express.static('public'));

// Configuraci�n de sesi�n
app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambiar a true si usas HTTPS
}));

// Middleware para manejar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(noob_helper); // Si lo necesitas

// Importamos el router principal
const router = require('./routes/users.js');  // Aseg�rate de que el archivo router.js maneje todas las rutas

// Usamos el router para manejar todas las rutas
app.use("/api", router);  // Ahora todas las rutas que est�n en router.js ser�n accesibles bajo /api

// Ruta principal (home)
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
