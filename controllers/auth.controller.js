const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // Charge les variables d'environnement depuis .env

// Fonction d'inscription
exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email et mot de passe sont requis' });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'L\'utilisateur avec cet email existe déjà' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new UserModel({
            email,
            password: hashedPassword,
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        // Générer un JWT token
        const token = jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.SECRET, { expiresIn: '1h' });

        // Répondre avec le token et les informations de l'utilisateur
        res.status(201).send({ token, user: { email: newUser.email, _id: newUser._id } });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erreur interne du serveur', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email et mot de passe sont requis' });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            // Utiliser la clé secrète définie dans .env pour signer le token
            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1h' });

            res.status(200).send({ token, user });
        } else {
            res.status(401).send({ message: 'Identifiants invalides' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erreur interne du serveur', error: err.message });
    }
};
