// controllers/skills.controller.js
const SkillModel = require('../models/skills.model');
const getAll = async (req, res) => {
  try {
      // Récupération des compétences avec les détails de l'utilisateur associé
      const data = await SkillModel.find().populate({
          path: "user_id", // Champ à peupler
          select: "email" // Champs spécifiques à inclure
      });

      // Réponse en cas de succès
      res.status(200).send(data);
  } catch (err) {
      // Gestion des erreurs
      console.error("Erreur lors de la récupération des compétences:", err);
      res.status(500).send({
          error: "Erreur lors de la récupération des compétences",
          details: err
      });
  }
};


// Créer une nouvelle compétence
const create = async (req, res) => {
  const skill = new SkillModel(req.body);

  try {
    const savedSkill = await skill.save();
    res.status(201).send(savedSkill);  // Compétence créée
  } catch (err) {
    res.status(400).send({ error: "Erreur lors de la création de la compétence", details: err });
  }
};

// Mettre à jour une compétence existante
const update = async (req, res) => {
  try {
    const result = await SkillModel.updateOne({ _id: req.params.id }, req.body);
    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Compétence mise à jour avec succès", result });
    } else {
      res.status(404).send({ error: "Compétence non trouvée ou aucune modification" });
    }
  } catch (err) {
    res.status(400).send({ error: "Erreur lors de la mise à jour de la compétence", details: err });
  }
};

// Supprimer une compétence
const remove = async (req, res) => {
  try {
    const result = await SkillModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).send({ message: "Compétence supprimée avec succès" });
    } else {
      res.status(404).send({ error: "Compétence non trouvée" });
    }
  } catch (err) {
    res.status(400).send({ error: "Erreur lors de la suppression de la compétence", details: err });
  }

};

module.exports = { getAll, create, update, remove };
