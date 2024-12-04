import React, { useState } from 'react';
import './QCM.css';

const questions = [
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

function QCM() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSubmitted(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer('');
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="qcm-container">
      <h1>Test de Niveau Angular</h1>
      <img src="https://via.placeholder.com/600x300/00796b/ffffff?text=Angular+Quiz" alt="Angular" className="quiz-image" />
      <div className="question-container">
        <h2>{questions[currentQuestionIndex].question}</h2>
        <form>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index} className="option-container">
              <input
                type="radio"
                id={option}
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={handleAnswerChange}
                className="answer-option"
              />
              <label htmlFor={option} className="answer-label">{option}</label>
            </div>
          ))}
        </form>
        <div>
          <button onClick={handleSubmit} disabled={submitted} className="submit-button">
            Soumettre la réponse
          </button>
        </div>
        {submitted && (
          <div>
            {selectedAnswer === questions[currentQuestionIndex].correctAnswer
              ? <p className="correct">Bonne réponse !</p>
              : <p className="incorrect">Mauvaise réponse. La bonne réponse était <strong>{questions[currentQuestionIndex].correctAnswer}</strong>.</p>}
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNextQuestion} className="next-button">Question suivante</button>
            ) : (
              <div>
                <h3 className="score">Votre score : {score}/{questions.length}</h3>
                <button onClick={() => window.location.reload()} className="restart-button">Recommencer le test</button>
              </div>
            )}
          </div>
        )}
      </div>
     
    </div>
  );
}

export default QCM;
