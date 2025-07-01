import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  
    window.history.pushState({}, '', '/personality-quiz/quiz'); 
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent); 
  }

  return (
    // Add the form here
     <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={inputName}
      onChange={(e) => setInputName(e.target.value)}
      placeholder="Enter your name"
      required
    />
    <button type="submit">Start Quiz</button>
  </form>
  );
}