import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "./components/ui/Provider";
import { BrowserRouter as Router } from "react-router-dom";
import { ProgressProvider } from "./context/ProgressContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";
import ChatContextProvider from "./context/ChatContext.jsx";
import "./toast.css";   // 👈 custom styles

createRoot(document.getElementById("root")).render(
    <Router>
      <ProgressProvider>
    <AppContextProvider>
        <ChatContextProvider>
      <Provider>
        <App />
            <ToastContainer position="top-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              pauseOnFocusLoss
              />
      </Provider>
        </ChatContextProvider>
    </AppContextProvider>
      </ProgressProvider>
    </Router>
);
