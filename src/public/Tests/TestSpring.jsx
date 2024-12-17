import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa"; // Import de l'icône engrenage
import NavBar from "../../components/public/landing/navBar";

const springQuestions = [
  {
    question: "Qu'est-ce que Spring Framework ?",
    options: ["Un framework JavaScript", "Un framework Java", "Un framework Python", "Un IDE"],
    correctAnswer: "Un framework Java"
  },
  {
    question: "Quel module Spring est utilisé pour la gestion de la dépendance ?",
    options: ["Spring MVC", "Spring Boot", "Spring Data", "Spring Core"],
    correctAnswer: "Spring Core"
  },
  {
    question: "Quelle annotation Spring est utilisée pour définir un bean ?",
    options: ["@Component", "@Bean", "@Autowired", "@Controller"],
    correctAnswer: "@Component"
  },
  {
    question: "Quelle est la fonction principale de Spring Boot ?",
    options: ["Développer des interfaces utilisateurs", "Créer des applications Java autonomes", "Gérer des bases de données", "Faire de la sécurité"],
    correctAnswer: "Créer des applications Java autonomes"
  },
  {
    question: "Quelle annotation est utilisée pour configurer un contrôleur Spring MVC ?",
    options: ["@Controller", "@RestController", "@Service", "@Repository"],
    correctAnswer: "@Controller"
  }
];

function TestSpring() {
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
    if (selectedAnswer === springQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < springQuestions.length - 1) {
      setSelectedAnswer('');
      setIsAnswered(false); // Réinitialiser l'état de la réponse
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20); // Réinitialiser le compte à rebours
    }
  };

  const isLastQuestion = currentQuestionIndex === springQuestions.length - 1;

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex bg-white rounded-lg shadow-xl overflow-hidden max-w-5xl w-full">
          {/* Formulaire */}
          <div className="w-full p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <FaCog size={60} color="#4CAF50" className="mr-2" /> {/* Icône engrenage pour Spring */}
              Test de Niveau Spring
            </h1>
            <div className="mb-4">
              <h2 className="text-xl text-gray-800 dark:text-white">
                {springQuestions[currentQuestionIndex].question}
              </h2>
            </div>
            <div>
              {springQuestions[currentQuestionIndex].options.map((option, index) => (
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
                  Votre score : {score}/{springQuestions.length}
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

export default TestSpring;
