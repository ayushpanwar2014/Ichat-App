import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./page/HomePage";
import Chatpage from "./page/Chatpage";
import { AppContext } from "./context/exportAppContext";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const {user, setUser} = useContext(AppContext); // store user data if logged in

  return (
    <div className="App">
      <Routes>
        {/* If user exists → go to chats, else show homepage */}
        <Route
          path="/"
          element={user ? <Navigate to="/chats" replace /> : <HomePage setUser={setUser} />}
        />
        {/* Chats page → only accessible if user exists */}
        <Route
          path="/chats"
          element={user ? <Chatpage user={user} /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
