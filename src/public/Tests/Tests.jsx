import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/public/landing/nav";

// Importation des images dynamiques
import reactImage from "../../assets/img/React.jpg";
import angularImage from "../../assets/img/Angular.png";
import nodeImage from "../../assets/img/Python.png";
import designImage from "../../assets/img/Angular.png";
import defaultImage from "../../assets/img/Angular.png";

const TestsPage = () => {
  const [tests, setTests] = useState([
    { id: 1, name: "React Basics", technology: "React", level: "Débutant", image: reactImage },
    { id: 2, name: "Angular Directives", technology: "Angular", level: "Intermédiaire", image: angularImage },
    { id: 3, name: "Node.js API", technology: "Node.js", level: "Avancé", image: nodeImage },
    { id: 4, name: "UI Design Principles", technology: "Design", level: "Débutant", image: designImage },
  ]);

  const [filter, setFilter] = useState("Tous");
  const navigate = useNavigate();

  const handleFilterChange = (tech) => {
    setFilter(tech);
  };

  const handleTestClick = (technology) => {
    // Rediriger vers une page spécifique pour chaque technologie
    const routes = {
      React: "/Tests/TestReact",
      Angular: "/Tests/TestAngular",
      "Node.js": "/Tests/TestNode",
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
          {["Tous", "React", "Angular", "Node.js", "Design"].map((tech) => (
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
            >
              <img
                src={test.image || defaultImage}
                alt={test.technology}
                style={styles.testImage}
              />
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
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "600",
    color: "#007BFF",
  },
  filters: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  filterBtn: {
    padding: "8px 15px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s",
  },
  activeFilter: {
    backgroundColor: "#007BFF",
    color: "white",
    borderColor: "#007BFF",
  },
  testsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "15px",
  },
  testCard: {
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "20px", 
    minHeight: "220px", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", 
  },
  
  testImage: {
    width: "100%",
    height: "80px",
    objectFit: "contain", 
    marginBottom: "10px", 
},

  testInfo: {
    padding: "10px",
  },
  testTitle: {
    fontSize: "1.2rem", 
    fontWeight: "600",
    marginBottom: "10px",
  },
  
  testDetail: {
    fontSize: "0.9rem",
    color: "#555",
  },
};

export default TestsPage;
