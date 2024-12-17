const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extraire le token de l'en-tête Authorization

    if (!token) {
        return res.status(403).send({ message: 'Token required' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid or expired token' });
        }
        // Attacher les informations décodées à la requête pour un accès ultérieur
        req.user = decoded;
        next(); // Continuer avec le prochain middleware ou la route
    });
};
