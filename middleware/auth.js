const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).send('Acceso denegado: Debes iniciar sesión');
    }
};

module.exports = authMiddleware;