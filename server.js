const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
app.use(express.static('public'));

app.use(session({
    secret: 'tu_secreto_seguro', // Cambia esto por una cadena segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

const users = require('./routes/users');
app.use("/api/", users);

app.get("/", (req,res) => {
    console.log(req.session)
    res.sendFile(__dirname + '/public/home.html');
})
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    });