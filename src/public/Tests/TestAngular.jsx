import React, { useState, useEffect } from "react";
import { FaAngular } from "react-icons/fa"; // Import de l'icône Angular
import { Link } from "react-router-dom";
import Nav from "../../components/public/landing/nav";

const angularQuestions = [
  {
    question: "Qu'est-ce qu'Angular ?",
    options: ["Un langage de programmation", "Un framework JavaScript", "Une bibliothèque React", "Un IDE"],
    correctAnswer: "Un framework JavaScript"
  },
  {
    question: "Qui a développé Angular ?",
    options: ["Google", "Facebook", "Microsoft", "Twitter"],
    correctAnswer: "Google"
  },
  {
    question: "Angular utilise quel type de structure de fichier ?",
    options: [".html", ".js", ".ts", ".java"],
    correctAnswer: ".ts"
  },
  {
    question: "Quel est le rôle de l'Angular CLI ?",
    options: ["Créer des composants Angular", "Automatiser le déploiement", "Gérer la base de données", "Générer des projets et des composants"],
    correctAnswer: "Générer des projets et des composants"
  },
  {
    question: "Quel est le format des fichiers de composant Angular ?",
    options: [".jsx", ".html", ".ts", ".css"],
    correctAnswer: ".ts"
  },
  {
    question: "Quelle directive est utilisée pour afficher des conditions dans Angular ?",
    options: ["ngIf", "ngModel", "ngFor", "ngClass"],
    correctAnswer: "ngIf"
  },
  {
    question: "Quel est le principal avantage de l'utilisation d'Angular ?",
    options: ["Performances supérieures", "Composants réutilisables", "Facilité d'intégration avec React", "Pas besoin de base de données"],
    correctAnswer: "Composants réutilisables"
  },
  {
    question: "Qu'est-ce qu'un Service dans Angular ?",
    options: ["Un type de composant", "Un objet pour gérer la logique métier", "Une fonction pour les requêtes HTTP", "Un stockage de données local"],
    correctAnswer: "Un objet pour gérer la logique métier"
  },
  {
    question: "Qu'est-ce que le Two-Way Data Binding dans Angular ?",
    options: ["Synchronisation de données entre le modèle et la vue", "Une technique de routage", "Une méthode d'optimisation des performances", "Un mécanisme de gestion des erreurs"],
    correctAnswer: "Synchronisation de données entre le modèle et la vue"
  },
  {
    question: "Quel est le nom du moteur de templates dans Angular ?",
    options: ["Handlebars", "EJS", "Mustache", "Angular Template"],
    correctAnswer: "Angular Template"
  }
];

function TestAngular() {
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
    if (selectedAnswer === angularQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < angularQuestions.length - 1) {
      setSelectedAnswer('');
      setIsAnswered(false); // Réinitialiser l'état de la réponse
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20); // Réinitialiser le compte à rebours
    }
  };

  const isLastQuestion = currentQuestionIndex === angularQuestions.length - 1;

  return (
    <>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex bg-white rounded-lg shadow-xl overflow-hidden max-w-5xl w-full">
          {/* Formulaire */}
          <div className="w-full p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <FaAngular size={60} color="#dd1b16" className="mr-2" /> {/* Ajout de l'icône Angular */}
              Test de Niveau Angular
            </h1>
            <div className="mb-4">
              <h2 className="text-xl text-gray-800 dark:text-white">
                {angularQuestions[currentQuestionIndex].question}
              </h2>
            </div>
            <div>
              {angularQuestions[currentQuestionIndex].options.map((option, index) => (
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
                  Votre score : {score}/{angularQuestions.length}
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

export default TestAngular;
