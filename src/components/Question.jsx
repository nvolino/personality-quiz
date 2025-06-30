import React from "react";

export default function Question({ question, options, onAnswer }) {
  return (
    <div>
      <h2>{question}</h2>
      <div>
        {options.map((option) => (
          <button key={option} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
