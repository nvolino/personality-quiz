import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";  

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter basename="/personality-quiz">
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
