import React from "react";

function Results({ results }) {
  if (!results) return null;

  return (
    <div className="results">
      <h3>Results</h3>
      <p>WPM: {results.wpm}</p>
      <p>Accuracy: {results.accuracy}%</p>
    </div>
  );
}

export default Results;