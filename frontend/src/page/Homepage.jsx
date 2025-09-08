
import { Container, Typography, Box } from "@mui/material";
import MacOSButtons from "../components/ui/Controls";
import Login from "../components/Login";
import { useState } from "react";
import Register from "../components/Register";

function HomePage() {

  const [form, setForm] = useState(true);

  return (

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
        gap: 3,    // spacing between elements
      }}
    >

      <MacOSButtons />

      {/* Headline */}
      <Typography variant="h3" color="whitesmoke" align="center" fontWeight={"500"} sx={{marginTop: -1}}>
        iChat
      </Typography>

      {
        form ? (
          <Login />
        ) :
          (
            <Register />
          )
      }

      <span onClick={() => setForm((prev) => !prev)} className="createAccount">{form ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}</span>
    </Container>
  );
}

export default HomePage;
