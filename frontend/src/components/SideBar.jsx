import { Box, List, ListItem, ListItemText, Avatar, Typography, Divider } from "@mui/material";
import { useContext } from "react";
import { ChatContext } from "../context/exportChatContext";
import { AppContext } from "../context/exportAppContext";

export default function SideBar() {
    const { AllUsersChats } = useContext(ChatContext);
    const { user } = useContext(AppContext);

    return (
        <Box
            sx={{
                marginLeft: { xs: 0, sm: "-30px" },
                marginTop: { xs: 5, sm: 5 },
                width: { xs: "100%", sm: "35%", md: "25%" },
                height: "100%",
                backgroundColor: "rgba(47, 47, 47, 0.05)",
                padding: { xs: 1, sm: 2 },
                display: "flex",
                borderTopRightRadius: { xs: 0, sm: 12 },
                border: "0.5px solid rgba(255, 255, 255, 0.12)",
                flexDirection: "column",
                gap: { xs: 1, sm: 2 },
            }}
        >
            {/* 🔹 Headline */}
            <Typography
                variant="h6"
                sx={{
                    fontSize: { xs: "0.9rem", sm: "1.05rem" },
                    fontWeight: 600,
                    color: "whitesmoke",
                    mb: 1,
                    letterSpacing: 0.5,
                    textAlign: 'center',

                }}
            >
                My Chats
            </Typography>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

            {/* 🔹 Chats List */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    maxHeight: "100vh",
                    paddingRight: 1,
                    paddingBottom: 3, // ensures last item fully visible
                    scrollBehavior: "smooth",

                    "&::-webkit-scrollbar": { display: "none" },

                    scrollbarWidth: "none",
                    scrollbarColor: "transparent transparent",
                }}
            >
                <List>
                    {AllUsersChats.map((chat, index) => {
                        const isGroup = chat.isGroupChat;
                        const otherUser = !isGroup
                            ? chat.users.find((u) => u._id !== user._id)
                            : null;

                        return (
                            <ListItem
                                key={chat._id || index}
                                sx={{
                                    borderBottom: "0.5px solid rgba(255, 255, 255, 0.28)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    borderRadius: 12,
                                    gap: 0.3,
                                    marginTop: 1,
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        cursor: "pointer",
                                    },
                                    transition: "all 0.2s ease",
                                    paddingY: { xs: 0.5, sm: 1 },
                                    paddingX: { xs: 1, sm: 2 },
                                }}
                            >
                                {/* Avatar + Chat Name */}
                                <Box
                                    sx={{ display: "flex", alignItems: "center", gap: { xs: 0.7, sm: 1 } }}
                                >
                                    <Avatar
                                        src={isGroup ? user.image : otherUser?.image}
                                        alt={isGroup ? chat.chatName : otherUser?.name}
                                        sx={{ width: { xs: 28, sm: 35 }, height: { xs: 28, sm: 35 } }}
                                    />
                                    <ListItemText
                                        primary={isGroup ? chat.chatName : otherUser?.name}
                                        primaryTypographyProps={{
                                            sx: {
                                                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                                                color: "whitesmoke",
                                                fontWeight: 500,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                maxWidth: { xs: "120px", sm: "200px" },
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Group Members Preview */}
                                {isGroup && (
                                    <Typography
                                        sx={{
                                            fontSize: { xs: "0.65rem", sm: "0.7rem" },
                                            color: "rgba(255,255,255,0.6)",
                                            marginLeft: { xs: 4, sm: 5 },
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: { xs: "150px", sm: "220px" },
                                            display: { sm: "none", lg: "block" },
                                            flexShrink: 1,
                                        }}
                                        noWrap
                                    >
                                        group:{" "}
                                        {chat.users
                                            .slice(0, 2)
                                            .map((u) => (u._id === user._id ? "You" : u.name))
                                            .join(", ")}
                                        {chat.users.length > 2 && " ..."}
                                    </Typography>
                                )}
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

        </Box>
    );
}
