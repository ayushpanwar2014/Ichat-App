import {
    Box,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
    Slide,
} from "@mui/material";

export default function SideDrawer({ drawerOpen }) {
    const users = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Williams"]; // example users

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
                    border: "0.5px solid rgba(255, 255, 255, 0.21)",
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

                {/* Search Input */}
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Search"
                    type="text"
                    name="search"
                    sx={{
                        height:50,
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: 5,
                        "& .MuiInputBase-input": {
                            color: "whitesmoke",
                            fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" }, // responsive input text
                        },
                        "& .MuiInputLabel-root": {
                            color: "whitesmoke",
                            fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.8rem" }, // responsive label
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                border: "none",
                            },
                            "&:hover fieldset": {
                                border: "none",
                            },
                            "&.Mui-focused fieldset": {
                                border: "none",
                            },
                        },
                    }}
                />

                {/* User List */}
                <List>
                    {users.map((user, index) => (
                        <ListItem button key={index}>
                            <ListItemText
                                primary={user}
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: {
                                            xs: "0.75rem", // very small on mobile
                                            sm: "0.80rem", // small on tablets
                                            md: "0.80rem", // slightly bigger on desktop
                                        },
                                        color: "whitesmoke",
                                    },
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Slide>
    );
}
