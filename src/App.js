import React, { useState, useEffect } from "react";
import textData from "./data/textData";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState(null);

  // Load random paragraph
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * textData.length);
    setText(textData[randomIndex]);
  }, []);

  // Timer logic
  useEffect(() => {
    let timer;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      calculateResults();
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleChange = (e) => {
    if (!isActive) setIsActive(true);
    setUserInput(e.target.value);
  };

  const calculateResults = () => {
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const wpm = wordsTyped;

    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) {
        correctChars++;
      }
    }

    const accuracy = ((correctChars / text.length) * 100).toFixed(2);

    setResults({ wpm, accuracy });
  };

  const restartTest = () => {
    setUserInput("");
    setTimeLeft(60);
    setIsActive(false);
    setResults(null);

    const randomIndex = Math.floor(Math.random() * textData.length);
    setText(textData[randomIndex]);
  };

  return (
    <div className="app">
      <h1>Typing Speed Tester</h1>

      <p className="text-display">{text}</p>

      <textarea
        value={userInput}
        onChange={handleChange}
        disabled={timeLeft === 0}
        placeholder="Start typing here..."
      />

      <h2>Time Left: {timeLeft}s</h2>

      {results && (
        <div className="results">
          <h3>Results</h3>
          <p>WPM: {results.wpm}</p>
          <p>Accuracy: {results.accuracy}%</p>
        </div>
      )}

      <button onClick={restartTest}>Restart</button>
    </div>
  );
}

export default App;
