import { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    InputAdornment,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";

function ChatBox() {
    const [messages, setMessages] = useState([
        { text: "Hey! How are you?", sender: "other" },
        { text: "I’m good, just working on a project 🚀", sender: "me" },
        { text: "Nice! Is it the MERN one you mentioned?", sender: "other" },
        { text: "Yes, adding chat functionality now 😃", sender: "me" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;
        setMessages([...messages, { text: input, sender: "me" }]);
        setInput("");
    };

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgba(47, 47, 47, 0.05)",
                border: "0.5px solid rgba(255, 255, 255, 0.12)",
                borderRight: "none",
                borderLeft: "none",
                borderRadius: "12px",
                mt:5,
                overflow: "hidden",
            }}
        >
            {/* Chat messages */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                }}
            >
                {messages.map((msg, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                            bgcolor: msg.sender === "me" ? "primary.main" : "grey.800",
                            color: "white",
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            maxWidth: "70%",
                            boxShadow: 1,
                        }}
                    >
                        <Typography variant="body2">{msg.text}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Input box */}
            <Box
                sx={{
                    borderTop: "0.5px solid rgba(255, 255, 255, 0.12)",
                    p: 1,
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    InputProps={{
                        sx: {
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "12px",
                            color: "white",
                        },
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
