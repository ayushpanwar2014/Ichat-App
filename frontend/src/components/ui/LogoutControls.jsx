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
} from "@mui/material";
import { AppContext } from "../../context/exportAppContext";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";

const notificationCount = 3;

export default function LogoutControls() {
    const { user } = useContext(AppContext);
    const { fetchLogout } = useContext(AppContext);

    const [openProfile, setOpenProfile] = useState(false);

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
                        badgeContent={notificationCount}
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
                    onClick={fetchLogout}
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

            {/* Profile Dialog */}
            <Dialog open={openProfile} onClose={() => setOpenProfile(false)}>
                <DialogTitle
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                    Profile
                    <IconButton onClick={() => setOpenProfile(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center" }}>
                    <Avatar
                        src={user?.image}
                        sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
                    />
                    <Typography variant="h6">{user?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.email}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
}
