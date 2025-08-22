import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "./components/ui/Provider";
import { BrowserRouter as Router } from "react-router-dom";
import { ProgressProvider } from "./context/ProgressContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ProgressProvider>

      <Provider>
        <App />
      </Provider>
      </ProgressProvider>
    </Router>
  </React.StrictMode>
);
