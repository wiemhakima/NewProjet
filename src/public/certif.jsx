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
    Technologie: <FaLaptop size={60} color="#007BFF" />,
    "Cloud Computing": <FaCloud size={60} color="#61dafb" />,
    "Sécurité Informatique": <FaShieldAlt size={60} color="#dd1b16" />,
    "Gestion de projet": <FaProjectDiagram size={60} color="#6db33f" />,
  };

  return (
    <div className="certifications-page bg-light min-vh-100">
      <Nav />
      <div style={styles.page}>
        {/* En-tête */}
        <header style={styles.header}>
          <h1 style={styles.title}>Préparation aux Certifications</h1>
        </header>

        {/* Filtres */}
        <div style={styles.filters}>
          {["Tout afficher", "Technologie", "Cloud Computing", "Sécurité Informatique", "Gestion de projet"].map((category) => (
            <button
              key={category}
              style={{
                ...styles.filterBtn,
                ...(selectedCategory === category ? styles.activeFilter : {}),
              }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Liste des certifications */}
        <div style={styles.certificationsList}>
          {filteredCertifications
            .slice(0, showAll ? filteredCertifications.length : 3)
            .map((cert) => (
              <div
                key={cert.name}
                style={styles.certCard}
                className="cert-card-hover"
              >
                <div style={styles.certIcon}>
                  {categoryIcons[cert.category]}
                </div>
                <div style={styles.certInfo}>
                  <h3 style={styles.certTitle}>{cert.name}</h3>
                  <p style={styles.certDetail}>
                    Catégorie : <strong>{cert.category}</strong>
                  </p>
                  <p style={styles.certDetail}>
                    Niveau : <strong>{cert.level}</strong>
                  </p>
                </div>
                <a
                  href={`/certifications/${cert.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  style={styles.viewDetailsBtn}
                >
                  Voir les détails
                </a>
              </div>
            ))}
        </div>

        {/* Bouton "Tout afficher" */}
        <div style={styles.showAllBtnContainer}>
          <button
            onClick={handleShowAllClick}
            style={styles.showAllBtn}
          >
            {showAll ? "Afficher moins" : "Tout afficher"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    backgroundColor: "#f7f8fa", // Couleur de fond douce
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#007BFF",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  filters: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "12px 20px",
    border: "1px solid #007BFF",
    backgroundColor: "white",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#007BFF",
    transition: "all 0.3s ease",
  },
  activeFilter: {
    backgroundColor: "#007BFF",
    color: "white",
    borderColor: "#007BFF",
  },
  certificationsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "30px",
  },
  certCard: {
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  certIcon: {
    marginBottom: "20px",
    color: "#333",
  },
  certInfo: {
    padding: "10px",
  },
  certTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },
  certDetail: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "5px",
  },
  viewDetailsBtn: {
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  showAllBtnContainer: {
    textAlign: "center",
    marginTop: "30px",
  },
  showAllBtn: {
    padding: "12px 24px",
    backgroundColor: "#28a745",
    color: "white",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
};

export default CertifPage;
