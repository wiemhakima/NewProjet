const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fonction d'inscription
exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email et mot de passe sont requis' });
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'L\'utilisateur avec cet email existe déjà' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.SECRET, { expiresIn: '1h' });

        res.status(201).send({
            token,
            user: { email: newUser.email, _id: newUser._id }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erreur interne du serveur', error: err.message });
    }
};

// Fonction de connexion
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email et mot de passe sont requis' });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1h' });

            res.status(200).send({
                token,
                user: { email: user.email, _id: user._id }
            });
        } else {
            res.status(401).send({ message: 'Identifiants invalides' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erreur interne du serveur', error: err.message });
    }
};
