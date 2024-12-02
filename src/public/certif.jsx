import React, { useState } from "react";
import Nav from "../components/public/landing/nav";
import { FaCloud, FaShieldAlt, FaProjectDiagram, FaLaptop } from "react-icons/fa"; // Importation des icônes

const CertifPage = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tout afficher");

  const certifications = [
    {
      name: "CompTIA A+",
      description: "Certifications en informatique pour débutants.",
      category: "Technologie",
      level: "Débutant",
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      description: "Acquérez les bases de l'utilisation de Microsoft Azure.",
      category: "Cloud Computing",
      level: "Débutant",
    },
    {
      name: "AWS Certified Solutions Architect",
      description: "Préparez-vous pour des solutions cloud avec AWS.",
      category: "Cloud Computing",
      level: "Intermédiaire",
    },
    {
      name: "Six Sigma Green Belt",
      description: "Apprenez les concepts avancés de gestion de projet.",
      category: "Gestion de projet",
      level: "Avancé",
    },
    {
      name: "(ISC)² CISSP",
      description: "Certification avancée en sécurité informatique.",
      category: "Sécurité Informatique",
      level: "Avancé",
    },
  ];

  const handleShowAllClick = () => {
    setShowAll(!showAll);
  };

  const filteredCertifications = certifications.filter(
    (cert) =>
      selectedCategory === "Tout afficher" || cert.category === selectedCategory
  );

  const categoryIcons = {
    Technologie: <FaLaptop />,
    "Cloud Computing": <FaCloud />,
    "Sécurité Informatique": <FaShieldAlt />,
    "Gestion de projet": <FaProjectDiagram />,
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Préparation aux Certifications</h1>
        <p className="text-gray-600 mb-8">
          Obtenez une certification professionnelle des plus grandes marques ou préparez-vous à des certifications reconnues.
        </p>

        {/* Filtre des catégories */}
        <div className="mb-6">
          <label htmlFor="category" className="text-gray-700 mr-2 font-medium">
            Filtrer par catégorie :
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="Tout afficher">Tout afficher</option>
            <option value="Technologie">Technologie</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Sécurité Informatique">Sécurité Informatique</option>
            <option value="Gestion de projet">Gestion de projet</option>
          </select>
        </div>

        {/* Liste des certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications
            .slice(0, showAll ? filteredCertifications.length : 3)
            .map((cert, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {cert.name}
                </h3>
                <p className="text-gray-700 mb-4">{cert.description}</p>
                <p className="text-gray-600 mb-2">
                  <strong>Catégorie : </strong>
                  <span className="inline-flex items-center gap-1">
                    {categoryIcons[cert.category]} {cert.category}
                  </span>
                </p>
                <p className="text-gray-600">
                  <strong>Niveau : </strong>
                  {cert.level}
                </p>
                <a
                  href={`/certifications/${cert.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Voir les détails
                </a>
              </div>
            ))}
        </div>

        {/* Bouton "Tout afficher" */}
        <div className="text-center mt-6">
          <button
            onClick={handleShowAllClick}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {showAll ? "Afficher moins" : "Tout afficher"}
          </button>
        </div>

        {/* Lien "Voir tout" */}
        <div className="text-center mt-4">
          <a
            href="/all-certifications"
            className="text-blue-500 hover:underline"
          >
            Voir toutes les certifications
          </a>
        </div>
      </div>
    </div>
  );
};

export default CertifPage;
