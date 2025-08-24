import  { useState } from "react";
import {
    Container,
    Box,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
    Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MacOSButtons from "../components/ui/Controls";
import LogoutControls from "../components/ui/LogoutControls";
import SideBar from "../components/SideBar";
import SideDrawer from "../components/SideDrawer";

function Chatpage() {

    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Container
            maxWidth={false}
            sx={{
                width: { xs: "95vw", sm: "80vw", md: "60vw", lg: "70vw" },
                height: { xs: "80vh", sm: "80vh", md: "80vh" },
                backgroundColor: "rgba(17, 25, 40, 0.85)",
                borderRadius: "15px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                marginTop: "10vh",
                position: "relative",
                overflow: "hidden", // keep drawer inside
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <MacOSButtons />
                <Box
                    color="inherit"
                    onClick={() => setDrawerOpen(!drawerOpen)}
                    sx={{
                        display: "flex",
                        gap: "8px",
                        position: "absolute",
                        top: "12px",
                        left: "80px",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        backgroundColor: "#ff3cf5ff",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
                        transition: "all 0.2s ease",
                     }}
                >
                    <MenuIcon sx={{ fontSize: 10, color: "black" }} />
                </Box>
                <LogoutControls />
            </Box>

            {/* Smooth sliding drawer inside container */}
            <SideDrawer drawerOpen={drawerOpen}/>

            {/* Sidebar (other content) */}
            {
                drawerOpen ? <></> : <SideBar />
            }
            
        </Container>
    );
}

export default Chatpage;
