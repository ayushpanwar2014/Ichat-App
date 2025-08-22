
import { Container, Box, Typography, Button, TextField, Link } from "@mui/material";
import MacOSButtons from "../components/ui/Controls";

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
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: { xs: 10, lg: 3 },
        }}
      >
        {/* Email */}
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          type="email"
          sx={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 5,
            "& .MuiInputBase-input": {
              color: "whitesmoke",
            },
            "& .MuiInputLabel-root": {
              color: "whitesmoke",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: 'none'
              },
              "&:hover fieldset": {
                border: 'none'
              },
              "&.Mui-focused fieldset": {
                border: 'none'
              },
            },
          }}
        />

        {/* Password */}
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          sx={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 5,
            "& .MuiInputBase-input": {
              color: "whitesmoke",
            },
            "& .MuiInputLabel-root": {
              color: "whitesmoke",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: 'none'
              },
              "&:hover fieldset": {
                border: 'none'
              },
              "&.Mui-focused fieldset": {
                border: 'none'
              },
            },
          }}
        />

        <Button 
          fullWidth
          sx={{
            mt: 10, py: 1.5,
            background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)", // gradient
            color: "white", fontWeight: "bold", fontSize: "1rem", borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",

          }}
        >
          Login
        </Button>
      </Box>

          <span  className="createAccount">Create an Account</span>

    </Container>
  );
}

export default HomePage;
