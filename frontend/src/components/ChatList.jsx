import { useContext } from "react";
import { ChatContext } from "../context/exportChatContext";
import { Box, List, ListItem, Avatar, ListItemText, Typography, Chip, useMediaQuery } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group"; // <-- Import Group icon

export default function ChatList({ AllUsersChats, user, OnClickOfUserChat }) {
    const { setSelectedChat } = useContext(ChatContext);
    const isMobile = useMediaQuery("(max-width:768px)");

    return (
        <Box
            sx={{
                flex: 1,
                overflowY: "auto",
                maxHeight: "100vh",
                paddingRight: 1,
                paddingBottom: 3,
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                scrollbarColor: "transparent transparent"
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
                            onClick={() => {
                                setSelectedChat(chat);
                                isMobile && OnClickOfUserChat();
                            }}
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
                            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.7, sm: 1 } }}>
                                <Avatar
                                    src={!isGroup ? otherUser?.image : undefined}
                                    alt={isGroup ? chat.chatName : otherUser?.name}
                                    sx={{ width: { xs: 28, sm: 35 }, height: { xs: 28, sm: 35 }, bgcolor: isGroup ? "primary.main" : "default" }}
                                >
                                    {isGroup && <GroupIcon sx={{ fontSize: { xs: 16, sm: 20 }, color: "white" }} />}
                                </Avatar>

                                <ListItemText
                                    primary={
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: "0.75rem", sm: "0.85rem" },
                                                    color: "whitesmoke",
                                                    fontWeight: 500,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: { xs: "120px", sm: "200px" },
                                                }}
                                            >
                                                {isGroup ? chat.chatName : otherUser?.name}
                                            </Typography>
                                            {isGroup && (
                                                <Chip
                                                    label="Group"
                                                    size="small"
                                                    sx={{
                                                        fontSize: "0.6rem",
                                                        height: "18px",
                                                        color: "white",
                                                        backgroundColor: "rgba(255,255,255,0.2)",
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    }
                                    secondary={
                                        isGroup
                                            ? (() => {
                                                const otherUsers = chat.users.filter(u => u._id !== user._id);
                                                const displayedUsers = otherUsers.slice(0, 2).map(u => u.name).join(", ");
                                                return otherUsers.length > 2
                                                    ? `${displayedUsers}, more...`
                                                    : displayedUsers;
                                            })()
                                            : null
                                    }
                                    secondaryTypographyProps={{
                                        sx: {
                                            fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                            color: "rgba(255,255,255,0.7)",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            maxWidth: { xs: "150px", sm: "220px" },
                                        },
                                    }}
                                />
                            </Box>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    )
}
