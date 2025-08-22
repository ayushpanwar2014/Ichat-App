
import { Container, Box, Typography, Button, TextField, Link } from "@mui/material";

function HomePage() {
  return (

    <Container
      maxWidth={false} // disable MUI breakpoints
      sx={{
        width: { xs: "95vw", sm: "80vw", md: "60vw", lg: "35vw" },
        height: { xs: "80vh", sm: "80vh", md: "80vh" },
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
      {/* Headline */}
      <Typography variant="h3" color="whitesmoke" align="center">
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
                borderColor: "none",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255,255,255,0.3)", // same as normal to remove blue focus
                borderRadius: 5
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
                borderColor: "none",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255,255,255,0.3)", // same as normal to remove blue focus
                borderRadius: 5
              },
            },
          }}
        />


        <Button
          fullWidth
          sx={{
            mt: 1,
            py: 1.5,
            background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)", // gradient
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          Login
        </Button>


        {/* Links */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          
        </Box>
      </Box>



    </Container>
  );
}

export default HomePage;
