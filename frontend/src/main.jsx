import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "./components/ui/Provider";
import { BrowserRouter as Router } from "react-router-dom";
import { ProgressProvider } from "./context/ProgressContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
    <Router>
      <ProgressProvider>
    <AppContextProvider>
      <Provider>
        <App />
      </Provider>
    </AppContextProvider>
      </ProgressProvider>
    </Router>
);
