import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/public/landing/nav";

// Importation des icônes dynamiques
import { FaReact, FaAngular, FaCog, FaPaintBrush } from "react-icons/fa"; // FaCog pour Spring

const TestsPage = () => {
  const [tests, setTests] = useState([
    { id: 1, name: "React Basics", technology: "React", level: "Débutant", icon: <FaReact size={60} color="#61dafb" /> },
    { id: 2, name: "Angular Directives", technology: "Angular", level: "Intermédiaire", icon: <FaAngular size={60} color="#dd1b16" /> },
    { id: 3, name: "Spring Framework", technology: "Spring", level: "Avancé", icon: <FaCog size={60} color="#6db33f" /> }, // FaCog pour Spring
    { id: 4, name: "UI Design Principles", technology: "Design", level: "Débutant", icon: <FaPaintBrush size={60} color="#e4e4e4" /> },
  ]);

  const [filter, setFilter] = useState("Tous");
  const navigate = useNavigate();

  const handleFilterChange = (tech) => {
    setFilter(tech);
  };

  const handleTestClick = (technology) => {
    const routes = {
      React: "/Tests/TestReact",
      Angular: "/Tests/TestAngular",
      Spring: "/Tests/TestSpring",  // Modification de la route pour Spring
      Design: "/Tests/TestDesign",
    };
    navigate(routes[technology] || "/Tests/TestDefault");
  };

  const filteredTests = filter === "Tous" ? tests : tests.filter((test) => test.technology === filter);

  return (
    <div className="tests-page bg-light min-vh-100">
      <Nav />
      <div style={styles.page}>
        {/* En-tête */}
        <header style={styles.header}>
          <h1 style={styles.title}>Tests Techniques</h1>
        </header>

        {/* Filtres */}
        <div style={styles.filters}>
          {["Tous", "React", "Angular", "Spring", "Design"].map((tech) => (
            <button
              key={tech}
              style={{
                ...styles.filterBtn,
                ...(filter === tech ? styles.activeFilter : {}),
              }}
              onClick={() => handleFilterChange(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Liste des tests */}
        <div style={styles.testsList}>
          {filteredTests.map((test) => (
            <div
              key={test.id}
              style={styles.testCard}
              onClick={() => handleTestClick(test.technology)}
              className="test-card-hover"
            >
              <div style={styles.testIcon}>
                {test.icon}
              </div>
              <div style={styles.testInfo}>
                <h3 style={styles.testTitle}>{test.name}</h3>
                <p style={styles.testDetail}>
                  Technologie : <strong>{test.technology}</strong>
                </p>
                <p style={styles.testDetail}>
                  Niveau : <strong>{test.level}</strong>
                </p>
              </div>
            </div>
          ))}
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
    textTransform: "uppercase", // Rendre le texte plus percutant
    letterSpacing: "2px",
  },
  filters: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap", // Permet aux filtres de s'ajuster à la taille de l'écran
  },
  filterBtn: {
    padding: "12px 20px", // Augmenter la taille du bouton
    border: "1px solid #007BFF",
    backgroundColor: "white",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "1.1rem", // Légèrement plus grand
    fontWeight: "600",
    color: "#007BFF",
    transition: "all 0.3s ease",
  },
  activeFilter: {
    backgroundColor: "#007BFF",
    color: "white",
    borderColor: "#007BFF",
  },
  testsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Agrandir la taille des cartes
    gap: "30px", // Plus d'espace entre les cartes
  },
  testCard: {
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "30px", // Augmenter le padding pour une carte plus grande
    minHeight: "300px", // Augmenter la hauteur minimale de la carte
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  testIcon: {
    marginBottom: "20px", // Plus d'espace entre l'icône et le texte
    color: "#333",
  },
  testInfo: {
    padding: "10px",
  },
  testTitle: {
    fontSize: "1.5rem", // Augmenter la taille du titre
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },
  testDetail: {
    fontSize: "1rem", // Agrandir légèrement le texte des détails
    color: "#555",
    marginBottom: "5px",
  },
  testCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)", // Ombre plus forte au survol
  },
};

export default TestsPage;
