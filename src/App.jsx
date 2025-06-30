import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Question from "./components/Question";
import Results from "./components/Results";
import { UserContext } from "./components/UserContext";

// Question data
const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
  {
    question: "Which environment do you prefer?",
    options: ["Volcano 🌋", "Ocean 🌊", "Forest 🌲", "Sky ☁️"],
  },
  {
    question: "Pick a power:",
    options: ["Flame 🔥", "Splash 💦", "Grow 🌱", "Float 💨"],
  },
];

// Keyword and mapping data
const keywords = {
  Fire: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air",
};

const elements = {
  "Red 🔴": "Fire",
  "Volcano 🌋": "Fire",
  "Flame 🔥": "Fire",
  "Blue 🔵": "Water",
  "Ocean 🌊": "Water",
  "Splash 💦": "Water",
  "Green 🟢": "Earth",
  "Forest 🌲": "Earth",
  "Grow 🌱": "Earth",
  "Yellow 🟡": "Air",
  "Sky ☁️": "Air",
  "Float 💨": "Air",
};

export default function App() {
  const { name } = useContext(UserContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex((prev) => prev + 1);
  }

  function handleUserFormSubmit(userName) {
    // Already handled via context in UserForm
    console.log("User name set:", userName);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach((answer) => {
      const el = elements[answer];
      counts[el] = (counts[el] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  }

  function fetchArtwork(keyword) {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&hasImages=true`
    )
      .then((res) => res.json())
      .then((data) => {
        const firstId = data.objectIDs?.[0];
        if (firstId) {
          return fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${firstId}`
          );
        } else {
          throw new Error("No artwork found");
        }
      })
      .then((res) => res.json())
      .then((data) => setArtwork(data))
      .catch((error) => console.error("Error fetching artwork:", error));
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const result = determineElement(answers);
      setElement(result);
      fetchArtwork(keywords[result]);
    }
  }, [currentQuestionIndex]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<UserForm onSubmit={handleUserFormSubmit} />}
        />
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
              <Results element={element} artwork={artwork} />
            )
          }
        />
      </Routes>
    </>
  );
}
