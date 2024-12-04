const mongoose = require('mongoose')


const skillSchema = mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'collection', required: true } // Lien avec l'utilisateur
});

module.exports = mongoose.model('Skill', skillSchema);