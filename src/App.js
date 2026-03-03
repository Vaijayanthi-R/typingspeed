
import React, { useState, useEffect } from "react";
import "./App.css";

const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "React makes building user interfaces simple and efficient.",
  "Typing speed is measured in words per minute.",
  "Practice makes perfect when it comes to typing.",
];
function App() {
  const [paragraph, setParagraph] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    const randomText =
      paragraphs[Math.floor(Math.random() * paragraphs.length)];
    setParagraph(randomText);
  }, []);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }

    if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearTimeout(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    const words = input.trim().split(" ").filter(word => word !== "");
    const currentWordCount = words.length;
    setWordCount(currentWordCount);

    const timeSpent = 60 - timeLeft;
    const minutes = timeSpent / 60;

    if (minutes > 0) {
      setWpm(Math.round(currentWordCount / minutes));
    }

    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === paragraph[i]) {
        correctChars++;
      }
    }

    if (input.length > 0) {
      setAccuracy(Math.round((correctChars / input.length) * 100));
    } else {
      setAccuracy(0);
    }
  }, [input, timeLeft, paragraph]);

  const handleChange = (e) => {
    if (!isActive) setIsActive(true);
    setInput(e.target.value);
  };

  const restartTest = () => {
    const randomText =
      paragraphs[Math.floor(Math.random() * paragraphs.length)];
    setParagraph(randomText);
    setInput("");
    setTimeLeft(60);
    setIsActive(false);
    setWordCount(0);
    setWpm(0);
    setAccuracy(0);
  };

  return (
    <div className="container">
      <h1>Typing Speed Tester</h1>

      <p className="paragraph">{paragraph}</p>

      <textarea
        value={input}
        onChange={handleChange}
        disabled={timeLeft === 0}
        placeholder="Start typing..."
      />

      <h2>Time Left: {timeLeft}s</h2>
      <h2>Words Typed: {wordCount}</h2>
      <h2>WPM: {wpm}</h2>
      <h2>Accuracy: {accuracy}%</h2>

      {timeLeft === 0 && (
        <div className="results">
          <h2>Final Results</h2>
          <p>Total Words: {wordCount}</p>
          <p>Final WPM: {wpm}</p>
          <p>Final Accuracy: {accuracy}%</p>
        </div>
      )}

      <button onClick={restartTest}>Restart</button>
    </div>
  );
}
export default App;