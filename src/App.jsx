import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import Question from "./components/Question";
import Results from "./components/Results";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  const questions = [
    {
      question: "What’s your ideal Saturday?",
      options: [
        "Napping in a sunbeam",
        "Going on a spontaneous road trip",
        "Hosting a party with friends",
        "Exploring a hiking trail",
      ],
    },
    {
      question: "What’s your favorite treat?",
      options: [
        "Biscuits",
        "Something exotic and new",
        "Something sweet and comforting",
        "Meat. Just meat.",
      ],
    },
    {
      question: "How do you react when someone knocks at the door?",
      options: [
        "I bark before I check. Always on alert.",
        "I look through the window but stay chill.",
        "I get excited—company’s the best!",
        "I hide until I know who it is.",
      ],
    },
    {
      question: "What kind of home makes you happiest?",
      options: [
        "A cozy apartment where I can curl up",
        "A big backyard to roam",
        "A bustling city with a million smells",
        "A quiet cabin in the woods",
      ],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };
  const elements = {
    // Q1
    "Napping in a sunbeam": "Relaxed",
    "Going on a spontaneous road trip": "Chill",
    "Hosting a party with friends": "Restless",
    "Exploring a hiking trail": "Sporty",
    // Q2
    Biscuits: "Relaxed",
    "Something exotic and new": "Chill",
    "Something sweet and comforting": "Restless",
    "Meat. Just meat.": "Sporty",
    // Q3
    "I bark before I check. Always on alert.": "Restless",
    "I look through the window but stay chill.": "Chill",
    "I get excited—company’s the best!": "Relaxed",
    "I hide until I know who it is.": "Sporty",
    // Q4
    "A cozy apartment where I can curl up": "Relaxed",
    "A big backyard to roam": "Sporty",
    "A bustling city with a million smells": "Restless",
    "A quiet cabin in the woods": "Chill",
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function (answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b;
    });
  }

  // Fetch a random dog image
  async function fetchDogImage() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setArtwork({
      primaryImage: data.message,
      artistDisplayName: "",
      objectDate: "",
    });
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchDogImage();
      }
    },
    [currentQuestionIndex]
  );

  return (
    <Routes>
      <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
      <Route
        path="/quiz"
        element={
          currentQuestionIndex < questions.length ? (
            <Question
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              onAnswer={handleAnswer}
            />
          ) : (
            <Results name={userName} element={element} artwork={artwork} />
          )
        }
      />
    </Routes>
  );
}

export default App;
