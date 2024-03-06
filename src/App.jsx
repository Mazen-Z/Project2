import React, { useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";

const App = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [flashcards, setFlashcards] = useState([
    {
      frontSide: "In what year was the iconic BMW M3 first introduced?",
      backSide: "1986",
    },
    {
      frontSide: "What does 'BMW' stand for",
      backSide: "Bavarian Motor Works",
    },
    {
      frontSide: "What is the top speed of the modern-day BMW M5 in mph", 
      backSide: "190",
    },
    {
      frontSide: "What is the name of Mercedes' sport line of vehicles", 
      backSide: "AMG",
    },
    {
      frontSide:
        "Which iconic Porsche model was introduced in 1963 and is considered Porsche's flagship vehicle", // Added possessive 's
      backSide: "911",
    },
    {
      frontSide:
        "What is the name of Porsche's first all-electric sports car",
      backSide: "Taycan",
    },
    {
      frontSide: "What is Audi's all-wheel-drive system called", 
      backSide: "Quattro",
    },
    {
      frontSide:
        "Which car brand is associated with the most aggressive drivers in the USA today",
      backSide: "BMW",
    },
  ]);

  const handleNextCard = () => {
    setSelectedCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setUserGuess("");
    setShowFeedback(false);
  };

  const handlePrevCard = () => {
    setSelectedCardIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
    setUserGuess("");
    setShowFeedback(false);
  };

  const handleShuffleCards = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setSelectedCardIndex(randomIndex);
    setUserGuess("");
    setShowFeedback(false);
  };

  const calcDistance = (a, b) => {
    const dp = Array(a.length + 1)
      .fill(null)
      .map(() => Array(b.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) {
      dp[i][0] = i;
    }

    for (let j = 0; j <= b.length; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }

    return dp[a.length][b.length];
  };

  const handleSubmit = () => {
    setShowFeedback(true);

    const correctAnswer = flashcards[selectedCardIndex].backSide.toLowerCase();
    const userAnswer = userGuess.toLowerCase();

    const maxAllowedDistance = 2;

    const Distance = calcDistance(
      correctAnswer,
      userAnswer
    );

    setIsCorrect(Distance <= maxAllowedDistance);
  };

  return (
    <div className="App">
      <h1>Car Trivia!</h1>
      <h2>Click on a card to show the answer</h2>
      <Flashcard
        frontSide={flashcards[selectedCardIndex].frontSide}
        backSide={flashcards[selectedCardIndex].backSide}
      />
      <div className="input-container">
        <input
          className="user-input"
          type="text"
          placeholder="Enter your guess"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          disabled={showFeedback}
        />
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={showFeedback}
        >
          Submit
        </button>
      </div>
      {showFeedback && (
        <div
          className={`feedback-message ${isCorrect ? "correct" : "incorrect"}`}
        >
          {isCorrect ? "Correct!" : "Incorrect!"}
        </div>
      )}
      <div className="button-container">
        <button className="next-card-btn" onClick={handlePrevCard}>
          Back
        </button>
        <button className="next-card-btn" onClick={handleNextCard}>
          Next
        </button>
      </div>
      <button className="next-card-btn" onClick={handleShuffleCards}>
        Shuffle
      </button>
    </div>
  );
};

export default App;