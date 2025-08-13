import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { LanguageProvider } from "./contexts/language-context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </Router>
  </StrictMode>
);
