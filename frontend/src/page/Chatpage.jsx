import { useState } from "react";
import {
    Container,
    Box,
    useMediaQuery
} from "@mui/material";
import MacOSButtons from "../components/ui/Controls";
import LogoutControls from "../components/ui/LogoutControls";
import SideBar from "../components/SideBar";
import SideDrawer from "../components/SideDrawer";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";

function Chatpage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isMobile = useMediaQuery("(max-width:768px)");

    // Toggle handlers (ensures exclusivity)
    const toggleDrawer = () => {
        setDrawerOpen(prev => {
            if (!prev) setSidebarOpen(false); // close sidebar if opening drawer
            return !prev;
        });
    };

    const toggleSidebar = () => {
        setSidebarOpen(prev => {
            if (!prev) setDrawerOpen(false); // close drawer if opening sidebar
            return !prev;
        });
    };

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
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <MacOSButtons />

                {/* Search icon */}
                <Box
                    onClick={toggleDrawer}
                    sx={{
                        display: "flex",
                        gap: "8px",
                        position: "absolute",
                        top: "13px",
                        left: "85px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
                        transition: "all 0.2s ease",
                    }}
                >
                    <SearchIcon sx={{ fontSize: 23, color: "white" }} />
                </Box>

                {/* Sidebar icon only for mobile */}
                {isMobile && (
                    <Box
                        onClick={toggleSidebar}
                        sx={{
                            display: "flex",
                            gap: "8px",
                            position: "absolute",
                            top: "13px",
                            left: "120px",
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
                            transition: "all 0.2s ease",
                        }}
                    >
                        <ChatIcon sx={{ fontSize: 23, color: "white" }} />
                    </Box>
                )}

                <LogoutControls />
            </Box>

            {/* Search drawer */}
            <SideDrawer drawerOpen={drawerOpen} />

            {/* Sidebar */}
            {isMobile ? (
                sidebarOpen && <SideBar />
            ) : (
                !drawerOpen && <SideBar />
            )}
        </Container>
    );
}

export default Chatpage;
