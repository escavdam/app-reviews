const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

const port = 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const session = require('express-session');
const noob_helper = require("./noob_helper.js");

app.use(express.static('public'));

app.use(session({
    secret: COOKIE_SECRET, // Cambia esto por una cadena segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(noob_helper);

// Importing the users route (already exists in your code)
const users = require('./routes/users');
app.use("/api/", users);

// Importing the new reviewRoutes route
const reviewRoutes = require('./routes/reviewRoutes');  // Import the new reviewRoutes file
app.use("/reviews", reviewRoutes); // Now we use /reviews route to handle reviews

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
