
import { Container, Box, Typography, TextField, Button } from "@mui/material";

function Chatpage() {


   


    return (
        <Container
            maxWidth={false} // disable MUI breakpoints
            sx={{
                width: { xs: "95vw", sm: "80vw", md: "60vw", lg: "70vw" }, // responsive widths
                height: { xs: "80vh", sm: "80vh", md: "80vh" }, // responsive heights
                backgroundColor: "rgba(17, 25, 40, 0.85)", // fallback for non-supporting browsers
                borderRadius: "15px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                marginTop: "10vh",
            }}
        >
            {/* Sidebar */}
            <Box
                sx={{
                    marginLeft: "-30px",
                    width: { xs: "37%", sm: "35%", md: "25%" },
                    height: '100%',
                    backgroundColor: "rgba(255,255,255,0.05)",
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >

            </Box>



        </Container>
    );
}

export default Chatpage;
