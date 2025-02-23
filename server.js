const dotenv = require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const authMiddleware = require('./middleware/auth');
const app = express();
const port = 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const session = require('express-session');
app.use(express.static('public'));

app.use(session({
    secret: COOKIE_SECRET, // Cambia esto por una cadena segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = require('./routes/users');
app.use("/api/", users);
const reviews = require('./routes/reviews');
app.use("/api/", reviews);

app.get("/", (req,res) => {
    res.sendFile(__dirname + '/public/home.html');
})

/*
app.get('/surveys', authMiddleware, (req, res) => {
  res.sendFile(__dirname + '/public/surveys.html');
});
*/

// Configuración de Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app,
  });
  
  app.get('/nunjucks', (req, res) => {
    const dato = 'Hola Mundo'; 
    res.render('test.njk', { dato: dato }); 
  });

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    });