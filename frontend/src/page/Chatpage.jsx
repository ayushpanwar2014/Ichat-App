import { useState } from "react";
import { Container, Box, useMediaQuery } from "@mui/material";
import MacOSButtons from "../components/ui/Controls";
import ProfileControls from "../components/ui/ProfileControls";
import SideBar from "../components/SideBar";
import SideDrawer from "../components/SideDrawer";
import AllUser from "../components/AllUser";
import SearchButton from "../components/SearchIcon";
import ChatBoxIcon from "../components/ChatBoxIcon"; // ✅ New icon
import ChatBox from "../components/ChatBox";

function Chatpage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chatBoxOpen, setChatBoxOpen] = useState(true);

    const isMobile = useMediaQuery("(max-width:768px)");

    // ✅ Toggle Drawer (independent)
    const toggleDrawer = () => {
        setDrawerOpen(prev => !prev);
    };

    // ✅ Toggle Sidebar (closes chatBox)
    const toggleSidebar = () => {
        setSidebarOpen(prev => {
            if (!prev) {
                setChatBoxOpen(false); // close chatbox if opening sidebar
            }
            return !prev;
        });
    };

    const OnClickOfUserChat = () => {
        console.log("hell");

        if (isMobile) {
            // 📱 Mobile → close sidebar, open chatbox
            setChatBoxOpen(true);
            setSidebarOpen(false);
        } else {
            // 💻 Desktop → just make sure chatbox stays visible
            setChatBoxOpen(true);
        }
    };

    // ✅ Toggle ChatBox (closes sidebar)
    const toggleChatBox = () => {
        setChatBoxOpen(prev => {
            if (!prev) {
                setSidebarOpen(false); // close sidebar if opening chatbox
            }
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
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                marginTop: "10vh",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 🔹 Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <MacOSButtons />
                <SearchButton toggleDrawer={toggleDrawer} />
                {isMobile && (
                    <>
                        <AllUser toggleSidebar={toggleSidebar} />
                        <ChatBoxIcon toggleChatBox={toggleChatBox} /> {/* ✅ new chatbox icon */}
                    </>
                )}
                <ProfileControls />
            </Box>

            {/* 🔹 Main Section */}
            <Box sx={{ display: "flex", height: "100%", justifyContent: "space-between" }}>
                {/* ✅ Laptop / PC Mode */}
                {!isMobile && (
                    <>
                        <SideBar toggleSidebar={toggleSidebar} />
                        <ChatBox />
                        <SideDrawer drawerOpen={drawerOpen} />
                    </>
                )}

                {/* ✅ Mobile Mode */}
                {isMobile && (
                    <>
                        {sidebarOpen && <SideBar OnClickOfUserChat={OnClickOfUserChat} />}
                        {chatBoxOpen && <ChatBox />}
                        {drawerOpen && <SideDrawer drawerOpen={drawerOpen} />}
                    </>
                )}
            </Box>
        </Container>
    );
}

export default Chatpage;
