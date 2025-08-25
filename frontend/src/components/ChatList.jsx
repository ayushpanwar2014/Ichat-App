import { useContext } from "react";
import { ChatContext } from "../context/exportChatContext";
import { Box, List, ListItem, Avatar, ListItemText } from "@mui/material";

export default function ChatList({ AllUsersChats, user, OnClickOfUserChat }) {
    const { setSelectedChat } = useContext(ChatContext);

    return (
        <Box sx={{ flex: 1, overflowY: "auto", maxHeight: "100vh", paddingRight: 1, paddingBottom: 3, scrollBehavior: "smooth", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none", scrollbarColor: "transparent transparent" }}>
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
                                OnClickOfUserChat();
                            }}   // 🔹 set the selected chat
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
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    )
}
