const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valide un email
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Le mot de passe doit contenir au moins 6 caractères."],
  },
});

module.exports = mongoose.model("User", userSchema);
