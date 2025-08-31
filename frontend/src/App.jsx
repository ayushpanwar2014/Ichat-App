import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Chatpage from "./page/Chatpage";
import HomePage from "./page/Homepage"
import { AppContext } from "./context/exportAppContext";
import "react-toastify/dist/ReactToastify.css";
import { Box, CircularProgress, Typography } from "@mui/material";

function App() {

  const { user, backendLoading } = useContext(AppContext); // user data from context


  return (

    !backendLoading ? (

      <div className="App">
        <Routes>
          {/* If user exists → go to chats, else show homepage */}
          <Route
            path="/"
            element={user ? <Navigate to="/chats" replace /> : <HomePage />}
          />
          {/* Chats page → only accessible if user exists */}
          <Route
            path="/chats"
            element={user ? <Chatpage /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    ) : (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Connecting to backend... Please wait</Typography>
      </Box>
    )
  );
}

export default App;
