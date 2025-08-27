import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/exportChatContext";
import axios from "axios";
import { Box, Typography, TextField, IconButton, InputAdornment } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import GreetingSequence from "./ui/GreetingSequence";
import VisibleIcon from "./visibleIcon";
import ChatDialog from "./ChatDialog";
import { AppContext } from "../context/exportAppContext";
import ScrollableFeed from "react-scrollable-feed";

function ChatBox() {
    const { selectedChat, backendURL } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const { user } = useContext(AppContext);

    const [openProfile, setOpenProfile] = useState(false);
    const [profileUser, setProfileUser] = useState(null); // For single user
    const isGroup = selectedChat?.isGroupChat;

    const getProfileUser = () => {
        if (!selectedChat) return null;
        if (isGroup) return null; // group will show all users
        // Single chat: find the other user
        return selectedChat.users.find(u => u._id !== user._id);
    };


    // Fetch messages whenever chat changes
    useEffect(() => {
        if (!selectedChat) return;
        const fetchMessages = async () => {
            try {

                const response = await axios.get(`${backendURL}/api/message/fetch/${selectedChat._id}`, { withCredentials: true });
                if (response.data.success) {
                    console.log(response.data.success);
                    
                    setMessages(response.data.messages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [selectedChat, backendURL]);

    const handleSend = async () => {
        if (!input.trim() || !selectedChat) return;
        try {
            const response = await axios.post(`${backendURL}/api/message/send`,
                { chatId: selectedChat._id, content: input },
                { withCredentials: true }
            );
            console.log(response.data.newMessage);
            
            if (response.data.success) {
                setMessages([...messages, response.data.newMessage]); // append new message
                setInput("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (!selectedChat) {

        return (
            <GreetingSequence />
        );
    }

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "rgba(47, 47, 47, 0.05)", border: "0.5px solid rgba(255, 255, 255, 0.12)", borderRadius: "12px", mt: 5, overflow: "hidden", borderLeft: "none", borderRight: "none"  }}>
            {/* Chat messages */}
            <Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1.5, height: "60vh" }}>
                <ScrollableFeed forceScroll={true} className="scrollable-chat" >
                {messages.map((msg) => {
                    const isMe = msg.sender._id === user._id;
                    return (
                        <Box
                            key={msg._id}
                            sx={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: isMe ? "flex-end" : "flex-start",
                                gap: 1,
                            }}
                        >
                            {/* Avatar on LEFT if not me */}
                            {!isMe && (
                                <Box
                                    component="img"
                                    src={msg.sender.image}
                                    alt={msg.sender.name}
                                    sx={{ width: 35, height: 35, borderRadius: "50%", mb:1 }}
                                />
                            )}

                            {/* Message bubble */}
                            <Box
                                sx={{
                                    bgcolor: isMe ? "primary.main" : "grey.800",
                                    color: "white",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 2,
                                    maxWidth: "65%",
                                    boxShadow: 1,
                                    mb: 1
                                }}
                            >
                                {/* Show sender name only in group chats */}
                                {isGroup && !isMe && (
                                    <Typography
                                        variant="caption"
                                        sx={{ fontWeight: "bold", display: "block", color: "#ccc" }}
                                    >
                                        {msg.sender.name}
                                    </Typography>
                                )}
                                <Typography variant="body2">{msg.content}</Typography>
                            </Box>

                            {/* Avatar on RIGHT if me */}
                            {isMe && (
                                <Box
                                    component="img"
                                    src={msg.sender.image}
                                    alt={msg.sender.name}
                                    sx={{ width: 35, height: 35, borderRadius: "50%", mb:1 }}
                                />
                            )}
                        </Box>
                    );
                })}
                </ScrollableFeed>
            </Box>



            {/* visible icon */}
            <VisibleIcon  setProfileUser={setProfileUser} setOpenProfile={setOpenProfile} getProfileUser={getProfileUser}  />

            {/* chatProfile  */}
            <ChatDialog selectedChat={selectedChat} openProfile={openProfile} setOpenProfile={setOpenProfile} isGroup={isGroup} profileUser={profileUser} />

            {/* Input box */}
            <Box sx={{ borderTop: "0.5px solid rgba(255, 255, 255, 0.12)", p: 1 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={input}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderRadius: 5,
                            "& fieldset": { border: "none" }, // normal
                            "&:hover fieldset": { border: "none" }, // hover
                            "&.Mui-focused fieldset": { border: "none" }, // focused
                            color: "whitesmoke",
                        },
                        "& .MuiInputBase-input": {
                            color: "whitesmoke",
                        },
                        "& .MuiInputLabel-root": {
                            color: "whitesmoke",
                        },
                        "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.05) inset",
                            WebkitTextFillColor: "whitesmoke",
                            caretColor: "whitesmoke",
                            borderRadius: 5,
                            transition: "background-color 9999s ease-in-out 0s",
                        },
                        "& input:-webkit-autofill:focus": {
                            WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.05) inset",
                            WebkitTextFillColor: "whitesmoke",
                            caretColor: "whitesmoke",
                        },
                    }}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton sx={{ color: "white" }}>
                                    <EmojiEmotionsIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton sx={{ color: "white" }} onClick={handleSend}>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Box>
    );
}

export default ChatBox;
