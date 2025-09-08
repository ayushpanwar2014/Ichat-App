import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Chatpage from "./page/Chatpage";
import HomePage from "./page/Homepage";
import { AppContext } from "./context/exportAppContext";
import "react-toastify/dist/ReactToastify.css";
import {  CircularProgress, Container, Typography } from "@mui/material";

function App() {
  const { user, backendLoading } = useContext(AppContext);

  return (
    <div className="App">
      {backendLoading || backendLoading == true ? (
        // Spinner overlay
        <Container
          maxWidth={false} // disable MUI breakpoints
          sx={{
            width: { xs: "95vw", sm: "80vw", md: "60vw", lg: "35vw" },
            height: { xs: "70vh", sm: "75vh", md: "80vh" },
            backgroundColor: "rgba(17, 25, 40, 0.85)",
            borderRadius: "15px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            backdropFilter: "blur(10px) saturate(180%)",
            WebkitBackdropFilter: "blur(10px) saturate(180%)",
            marginTop: "10vh",
            padding: 4, // padding inside the container
            gap: 4,    // spacing between elements
          }}
        >
          <CircularProgress sx={{mt:20}} color="secondary" size={60} />
          <Typography sx={{ mt: 5, color: "whitesmoke", fontSize: "1.2rem", textAlign: "center" }}>
            Connecting to backend from Render... Please wait
          </Typography>
        </Container>
      ) : (
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/chats" replace /> : <HomePage />}
          />
          <Route
            path="/chats"
            element={user ? <Chatpage /> : <Navigate to="/" replace />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
