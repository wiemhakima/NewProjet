import React, { useState, useEffect } from "react";
import { FaReact } from "react-icons/fa"; // Import de l'icône React
import { Link } from "react-router-dom";
import NavBar from "../../components/public/landing/navBar";

const reactQuestions = [
  {
    question: "Qu'est-ce que React ?",
    options: ["Un langage de programmation", "Un framework JavaScript", "Une bibliothèque JavaScript", "Un IDE"],
    correctAnswer: "Une bibliothèque JavaScript"
  },
  {
    question: "Quel est le principal avantage de React ?",
    options: ["Gestion du routage", "Composants réutilisables", "Facilité de gestion des états", "Pas besoin de base de données"],
    correctAnswer: "Composants réutilisables"
  },
  {
    question: "Que permet le Virtual DOM dans React ?",
    options: ["Optimisation de la gestion de la mémoire", "Rendu côté serveur", "Amélioration des performances en minimisant les changements du DOM réel", "Gestion de l'état du composant"],
    correctAnswer: "Amélioration des performances en minimisant les changements du DOM réel"
  },
  {
    question: "Que signifie JSX dans React ?",
    options: ["JavaScript eXtended", "JavaScript XML", "Java Syntax Extension", "Java Standard Extension"],
    correctAnswer: "JavaScript XML"
  },
  {
    question: "Quel est le rôle de `useState` dans React ?",
    options: ["Gérer les effets secondaires", "Gérer l'état d'un composant fonctionnel", "Rendre un composant", "Créer des composants"],
    correctAnswer: "Gérer l'état d'un composant fonctionnel"
  },
  {
    question: "Quel est le rôle du Hook `useEffect` dans React ?",
    options: ["Gérer l'état", "Exécuter du code après le rendu", "Gérer les événements", "Mettre à jour le DOM"],
    correctAnswer: "Exécuter du code après le rendu"
  },
  {
    question: "Qu'est-ce qu'un 'prop' dans React ?",
    options: ["Une propriété interne d'un composant", "Un attribut du DOM", "Une méthode pour manipuler l'état", "Un argument passé à un composant"],
    correctAnswer: "Un argument passé à un composant"
  },
  {
    question: "Quelle méthode de cycle de vie est appelée juste avant que le composant soit supprimé ?",
    options: ["componentDidMount", "componentWillUnmount", "componentDidUpdate", "shouldComponentUpdate"],
    correctAnswer: "componentWillUnmount"
  },
  {
    question: "Qu'est-ce qu'une clé unique dans une liste React ?",
    options: ["Un identifiant unique pour chaque élément de la liste", "Un type de prop", "Une fonction de filtrage", "Une méthode pour trier les éléments"],
    correctAnswer: "Un identifiant unique pour chaque élément de la liste"
  },
  {
    question: "Que fait la méthode `setState` dans React ?",
    options: ["Met à jour l'état d'un composant", "Met à jour le DOM", "Rend un composant", "Gère les événements"],
    correctAnswer: "Met à jour l'état d'un composant"
  }
];

function TestReact() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20); // Temps restant par question
  const [isAnswered, setIsAnswered] = useState(false); // Si une réponse a été sélectionnée

  useEffect(() => {
    // Lancer un compte à rebours de 20 secondes par question
    if (timeLeft > 0 && !isAnswered) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleNextQuestion();
    }
  }, [timeLeft, isAnswered]);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
    setIsAnswered(true); // Marquer la question comme répondue
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === reactQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < reactQuestions.length - 1) {
      setSelectedAnswer('');
      setIsAnswered(false); // Réinitialiser l'état de la réponse
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20); // Réinitialiser le compte à rebours
    }
  };

  const isLastQuestion = currentQuestionIndex === reactQuestions.length - 1;

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex bg-white rounded-lg shadow-xl overflow-hidden max-w-5xl w-full">
          {/* Formulaire */}
          <div className="w-full p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <FaReact size={60} color="#61DAFB" className="mr-2" />
              Test de Niveau React
            </h1>
            <div className="mb-4">
              <h2 className="text-xl text-gray-800 dark:text-white">
                {reactQuestions[currentQuestionIndex].question}
              </h2>
            </div>
            <div>
              {reactQuestions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <input
                    type="radio"
                    id={option}
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={handleAnswerChange}
                    className="mr-2"
                    disabled={isAnswered} // Désactiver les options après une réponse
                  />
                  <label htmlFor={option} className="text-gray-700 dark:text-white">{option}</label>
                </div>
              ))}
            </div>

            {/* Affichage du temps restant */}
            <div className="text-sm text-gray-600 dark:text-white mb-4">
              Temps restant : {timeLeft}s
            </div>

            {/* Bouton pour avancer vers la question suivante */}
            <button
              type="button"
              onClick={handleNextQuestion}
              className={`w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg rounded-lg hover:opacity-90 transition ${!isAnswered && 'cursor-not-allowed opacity-50'}`}
              disabled={!isAnswered} // Désactiver le bouton si aucune réponse n'est sélectionnée
            >
              {isLastQuestion ? "Voir les résultats" : "Question suivante"}
            </button>

            {/* Affichage du score à la fin */}
            {isLastQuestion && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Votre score : {score}/{reactQuestions.length}
                </h3>
                <Link
                  to="/Landing"
                  className="mt-4 text-blue-500 hover:text-indigo-600 font-semibold"
                >
                  Voir les résultats
                </Link>
              </div>
            )}
          </div>

          {/* Illustration */}
          <div className="w-1/2 bg-blue-50 dark:bg-gray-800 relative flex items-center justify-center">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-lg"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-40 blur-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestReact;
