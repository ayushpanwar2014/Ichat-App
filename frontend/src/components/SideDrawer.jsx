import {
    Box,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
    Slide,
    Button,
    Avatar,
    IconButton,
    Skeleton
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useContext } from "react";
import { ChatContext } from "../context/exportChatContext";

export default function SideDrawer({ drawerOpen }) {
    const { onHandleSearch, search, setSearch, searchUsers, loading, onHandleAccessChat } = useContext(ChatContext);

    return (
        <Slide direction="right" in={drawerOpen} mountOnEnter unmountOnExit>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    marginTop: 5,
                    width: { xs: "100%", sm: "30%", md: "24%", lg: "23.3%" },
                    height: "100%",
                    backgroundColor: "rgba(7, 6, 6, 0)",
                    border: "0.5px solid rgba(255, 255, 255, 0.12)",
                    borderTopRightRadius: 12,
                    zIndex: 10,
                    padding: 2,
                }}
            >
                {/* Title */}
                <Typography
                    variant="h6"
                    mb={2}
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
                        fontWeight: 600,
                        color: "whitesmoke",
                    }}
                >
                    Search Users
                </Typography>

                {/* Search Input + Go Button */}
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search"
                        type="text"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{
                            height: 50,
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderRadius: 5,
                            "& .MuiInputBase-input": { color: "whitesmoke", },
                            "& .MuiInputLabel-root": { color: "whitesmoke" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { border: "none" },
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            height: 50,
                            fontSize: 13,
                            borderRadius: 5,
                            backgroundColor: "rgba(255,255,255,0.15)",
                            color: "whitesmoke",
                            "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                        }}
                        onClick={onHandleSearch}
                    >
                        Go
                    </Button>
                </Box>

                {/* Loader OR User List */}
                {loading ? (
                    <List>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <ListItem
                                key={i}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    borderBottom: "0.5px solid rgba(255, 255, 255, 0.28)",
                                    borderRadius: 12,
                                    marginTop: 1,
                                    py: 1,
                                }}
                            >
                                {/* Avatar skeleton */}
                                <Skeleton
                                    variant="circular"
                                    width={35}
                                    height={35}
                                    sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
                                />
                                {/* Text skeleton */}
                                <Skeleton
                                    variant="text"
                                    width="60%"
                                    height={20}
                                    sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box
                            sx={{
                                maxHeight: 350,
                                overflowY: "auto",

                                // Smooth scrolling for programmatic scrolls
                                scrollBehavior: "smooth",

                                // Momentum scroll effect (iOS/Safari/WebKit)
                                WebkitOverflowScrolling: "touch",

                                // Hide scrollbar
                                "&::-webkit-scrollbar": { display: "none" },
                                scrollbarWidth: "none",
                                scrollbarColor: "transparent transparent",
                            }}

                    >
                        <List>
                            {searchUsers.map((user, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        borderBottom: "0.5px solid rgba(255, 255, 255, 0.28)",
                                        display: "flex",
                                        alignItems: "center",
                                        borderRadius: 12,
                                        gap: 1,
                                        marginTop: 1,
                                        justifyContent: "space-between",
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            cursor: "pointer",
                                        },
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Avatar
                                            src={user.image}
                                            alt={user.name}
                                            sx={{ width: 35, height: 35 }}
                                        />
                                        <ListItemText
                                            primary={user.name}
                                            primaryTypographyProps={{
                                                sx: { fontSize: "0.8rem", color: "whitesmoke" },
                                            }}
                                        />
                                    </Box>
                                    <IconButton
                                        onClick={() => onHandleAccessChat(user._id)}
                                        sx={{
                                            color: "gray",
                                            "&:hover": {
                                                backgroundColor: "rgba(255,255,255,0.05)",
                                                cursor: "pointer",
                                            },
                                        }}
                                    >
                                        <PersonAddIcon fontSize="small" />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}

            </Box>
        </Slide>
    );
}
