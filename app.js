const express = require("express");
const collection = require("./mongo");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route GET pour la page d'accueil
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API !"); 
});

// Route POST pour la connexion
app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await collection.findOne({ email: email });
        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json("not exist !!");
    }
});

// Route POST pour l'inscription
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const data = { email: email, password: password };

    try {
        const check = await collection.findOne({ email: email });
        if (check) {
            res.json("exist");
        } else {
            await collection.insertMany([data]);
            res.json("notexist");
        }
    } catch (e) {
        res.json("not exist !!");
    }
});

// Démarrage du serveur
app.listen(8000, () => {
    console.log("Serveur démarré sur le port 8000");
});
