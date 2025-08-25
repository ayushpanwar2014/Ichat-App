import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/exportChatContext";
import axios from "axios";
import { Box, Typography, TextField, IconButton, InputAdornment } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import GreetingSequence from "./ui/GreetingSequence";

function ChatBox() {
    const { selectedChat, backendURL } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // Fetch messages whenever chat changes
    useEffect(() => {
        if (!selectedChat) return;
        const fetchMessages = async () => {
            try {
                console.log(selectedChat);
                
                const response = await axios.get(`${backendURL}/api/message/${selectedChat._id}`, { withCredentials: true });
                if (response.data.success) {
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
            const response = await axios.post(`${backendURL}/api/message`,
                { chatId: selectedChat._id, content: input },
                { withCredentials: true }
            );
            if (response.data.success) {
                setMessages([...messages, response.data.message]); // append new message
                setInput("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (!selectedChat) {

        return (
          <GreetingSequence/>
        );
    }

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "rgba(47, 47, 47, 0.05)", border: "0.5px solid rgba(255, 255, 255, 0.12)", borderRadius: "12px", mt: 5, overflow: "hidden" }}>
            {/* Chat messages */}
            <Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {messages.map((msg, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            alignSelf: msg.sender._id === selectedChat._id ? "flex-start" : "flex-end",
                            bgcolor: msg.sender._id === selectedChat._id ? "grey.800" : "primary.main",
                            color: "white",
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            maxWidth: "70%",
                            boxShadow: 1,
                        }}
                    >
                        <Typography variant="body2">{msg.content}</Typography>
                    </Box>
                ))}
            </Box>

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
