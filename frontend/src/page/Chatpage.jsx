import { useState } from "react";
import {
    Container,
    Box,
    useMediaQuery
} from "@mui/material";
import MacOSButtons from "../components/ui/Controls";
import ProfileControls from "../components/ui/ProfileControls";
import SideBar from "../components/SideBar";
import SideDrawer from "../components/SideDrawer";

import MessageIcon from "../components/MessageIcon";
import SearchButton from "../components/SearchIcon";


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
                <SearchButton toggleDrawer={toggleDrawer} />

                {/* Sidebar icon only for mobile */}
                {isMobile && (
                    <MessageIcon toggleSidebar={toggleSidebar}/>
                )}

                <ProfileControls />
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
