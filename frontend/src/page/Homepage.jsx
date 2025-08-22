
import { Container, Box, Typography, Button, TextField, Link } from "@mui/material";
import MacOSButtons from "../components/ui/Controls";
import Login from "../components/ui/Login";

function HomePage() {
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
        gap: 4,    // spacing between elements
      }}
    >
      <MacOSButtons/>
      {/* Headline */}
      <Typography variant="h3" color="whitesmoke" align="center" fontWeight={"500"}>
        iChat
      </Typography>

      {/* Login Form */}
      <Login/>

          <span  className="createAccount">Create an Account</span>

    </Container>
  );
}

export default HomePage;
