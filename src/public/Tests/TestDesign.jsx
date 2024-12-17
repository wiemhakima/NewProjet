import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPaintBrush } from "react-icons/fa"; // Import de l'icône de pinceau
import NavBar from "../../components/public/landing/navBar";

const designQuestions = [
  // ... (Les questions restent inchangées)
  {
    question: "Quel est l'objectif principal d'un design UX ?",
    options: ["Esthétique", "Facilité d'utilisation", "Créativité", "Fonctionnalité"],
    correctAnswer: "Facilité d'utilisation",
  },
  {
    question: "Qu'est-ce qu'un wireframe ?",
    options: ["Un prototype", "Un schéma de l'interface", "Un outil de design graphique", "Une maquette interactive"],
    correctAnswer: "Un schéma de l'interface",
  },
  // Ajoutez les autres questions ici
];

function TestDesign() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20); // Temps restant par question
  const [isAnswered, setIsAnswered] = useState(false); // Indique si la question a été répondue

  // Gestion du temps avec useEffect
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleNextQuestion(); // Passer automatiquement à la question suivante
    }
  }, [timeLeft, isAnswered]);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
    setIsAnswered(true); // Marquer comme répondu
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === designQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < designQuestions.length - 1) {
      setSelectedAnswer('');
      setIsAnswered(false); // Réinitialiser l'état
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20); // Réinitialiser le compte à rebours
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer('');
    setTimeLeft(20);
    setIsAnswered(false);
  };

  const isLastQuestion = currentQuestionIndex === designQuestions.length - 1;

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex bg-white rounded-lg shadow-xl overflow-hidden max-w-5xl w-full">
          <div className="w-full p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              <FaPaintBrush className="inline-block mr-2 text-blue-500" /> Test de Conception UI/UX
            </h1>
            <div className="mb-4">
              <h2 className="text-xl text-gray-800 dark:text-white">
                {designQuestions[currentQuestionIndex].question}
              </h2>
            </div>
            <div>
              {designQuestions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <input
                    type="radio"
                    id={option}
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={handleAnswerChange}
                    disabled={isAnswered} // Désactiver après sélection
                    className="mr-2"
                  />
                  <label htmlFor={option} className="text-gray-700 dark:text-white">{option}</label>
                </div>
              ))}
            </div>

            <div className="text-sm text-gray-600 dark:text-white mb-4">
              Temps restant : {timeLeft}s
            </div>

            <button
              type="button"
              onClick={handleNextQuestion}
              className={`w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg rounded-lg hover:opacity-90 transition ${
                !isAnswered && "cursor-not-allowed opacity-50"
              }`}
              disabled={!isAnswered} // Bouton désactivé si aucune réponse
            >
              {isLastQuestion ? "Voir les résultats" : "Question suivante"}
            </button>

            {isLastQuestion && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Votre score : {score}/{designQuestions.length}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-white">
                  {score === designQuestions.length
                    ? "Excellent travail !"
                    : score >= designQuestions.length / 2
                    ? "Bon travail !"
                    : "Essayez de vous améliorer !"}
                </p>
                <button
                  onClick={resetQuiz}
                  className="mt-4 text-blue-500 hover:text-indigo-600 font-semibold"
                >
                  Retenter le quiz
                </button>
                <Link
                  to="/Landing"
                  className="mt-4 block text-blue-500 hover:text-indigo-600 font-semibold"
                >
                  Voir les résultats
                </Link>
              </div>
            )}
          </div>

          <div className="w-1/2 bg-blue-50 dark:bg-gray-800 relative flex items-center justify-center">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-lg"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-40 blur-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestDesign;
