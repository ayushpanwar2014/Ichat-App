import { useContext, useState } from "react";
import {
    Box,
    Badge,
    Avatar,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
    Grow,
} from "@mui/material";
import { AppContext } from "../../context/exportAppContext";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { ChatContext } from "../../context/exportChatContext";

export default function ProfileControls() {
    const { user, fetchLogout } = useContext(AppContext);
    const { notification } = useContext(ChatContext);

    const [openProfile, setOpenProfile] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseNotification = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    gap: "20px",
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                }}
            >
                {/* Avatar + Name */}
                <Box
                    onClick={() => setOpenProfile(true)}
                    sx={{
                        marginTop: "-8px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                    }}
                >
                    <Avatar
                        sx={{
                            marginTop: 0.3,
                            width: 28,
                            height: 28,
                            bgcolor: "#0073ffff",
                            color: "#fff",
                            "&:hover": { transform: "scale(1.1)", cursor: "pointer" },
                            transition: "all 0.2s ease",
                        }}
                        src={user?.image}
                    />
                    <Typography
                        sx={{
                            color: "white",
                            fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                            fontWeight: 500,
                            marginRight: -1,
                        }}
                    >
                        {user?.name}
                    </Typography>
                </Box>

                {/* Notifications */}
                <Box
                    onClick={handleNotificationClick}
                    sx={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
                        transition: "all 0.2s ease",
                    }}
                >
                    <Badge
                        badgeContent={notification.length}
                        color="error"
                        sx={{
                            "& .MuiBadge-badge": {
                                fontSize: "0.65rem",
                                height: "16px",
                                minWidth: "16px",
                                top: 2,
                                right: 2,
                            },
                        }}
                    >
                        <NotificationsIcon sx={{ fontSize: 23, color: "white" }} />
                    </Badge>
                </Box>

                {/* Logout */}
                <Box
                    onClick={() => {fetchLogout()}}
                    sx={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#0073ffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
                        transition: "all 0.2s ease",
                    }}
                >
                    <LogoutIcon sx={{ fontSize: 13, color: "black" }} />
                </Box>
            </Box>

            {/* Notifications Menu */}
            {/* Notifications Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseNotification}
                TransitionComponent={Grow}
                PaperProps={{
                    sx: {
                        mt: 1,
                        backgroundColor: "rgba(29, 6, 6, 0.35)", // ✅ semi-transparent bg
                        borderRadius: 2,
                        color: "white",
                        border: "0.5px solid rgba(255, 255, 255, 0.12)",
                        minWidth: 200, // smaller dropdown
                        backdropFilter: "blur(12px) saturate(180%)", // ✅ blur effect
                        WebkitBackdropFilter: "blur(12px) saturate(180%)", // ✅ iOS/Safari
                        boxShadow: "0 4px 20px rgba(0,0,0,0.25)", // ✅ subtle shadow
                    },
                }}
            >
                {notification.length === 0 ? (
                    <MenuItem dense>
                        <ListItemText
                            primary="No new notifications"
                            primaryTypographyProps={{ fontSize: "0.75rem" }} // smaller font
                        />
                    </MenuItem>
                ) : (
                    notification.map((n, i) => (
                        <MenuItem
                            key={i}
                            onClick={handleCloseNotification}
                            dense
                            sx={{
                                px: 1.5,
                                py: 1,
                            }}
                        >
                            <ListItemText
                                primary={`${n.sender?.name || "Someone"} sent a message`}
                                secondary={n.content || ""}
                                primaryTypographyProps={{
                                    fontSize: "0.75rem", // smaller font
                                    color: "white",
                                }}
                                secondaryTypographyProps={{
                                    fontSize: "0.65rem", // even smaller for secondary
                                    color: "rgba(255,255,255,0.6)",
                                }}
                            />
                        </MenuItem>
                    ))
                )}
            </Menu>


            {/* Profile Dialog */}
            <Dialog
                open={openProfile}
                onClose={() => setOpenProfile(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: "rgba(29, 6, 6, 0.35)", // ✅ semi-transparent bg
                        backdropFilter: "blur(12px) saturate(180%)", // ✅ blur effect
                        WebkitBackdropFilter: "blur(12px) saturate(180%)", // ✅ iOS/Safari
                        boxShadow: "0 4px 20px rgba(0,0,0,0.25)", // ✅ subtle shadow
                        border: "0.5px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: 3,
                        color: "whitesmoke",
                    },
                }}
            >
                <DialogTitle
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                    Profile
                    <IconButton onClick={() => setOpenProfile(false)} sx={{ color: "whitesmoke" }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center" }}>
                    <Avatar
                        src={user?.image}
                        sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
                    />
                    <Typography variant="h6" sx={{ color: "whitesmoke" }}>
                        {user?.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        {user?.email}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
}
