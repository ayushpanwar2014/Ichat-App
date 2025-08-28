import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/exportChatContext";
import axios from "axios";
import { Box, Typography, TextField, IconButton, InputAdornment, Skeleton } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import GreetingSequence from "./ui/GreetingSequence";
import VisibleIcon from "./visibleIcon";
import ChatDialog from "./ChatDialog";
import { AppContext } from "../context/exportAppContext";
import ScrollableFeed from "react-scrollable-feed";
import { useSocket } from "../hooks/useSocket";

function ChatBox() {
    const { selectedChat, backendURL } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const { user } = useContext(AppContext);
    const [loadingMessages, setLoadingMessages] = useState(false);

    const [isTyping, setIsTyping] = useState(false);
    const [typing, setTyping] = useState(false);

    const [openProfile, setOpenProfile] = useState(false);
    const [profileUser, setProfileUser] = useState(null); // For single user
    const isGroup = selectedChat?.isGroupChat;

    const getProfileUser = () => {
        if (!selectedChat) return null;
        if (isGroup) return null; // group will show all users
        // Single chat: find the other user
        return selectedChat.users.find(u => u._id !== user._id);
    };

    // ✅ socket hook usage
    const socketRef = useSocket(
        user,
        backendURL,
        (newMessage) => setMessages((prev) => [...prev, newMessage]), // onMessage
        () => setIsTyping(true), // onTyping
        () => setIsTyping(false) // onStopTyping
    );

    // join the selected chat
    useEffect(() => {
        if (selectedChat && socketRef.current) {
            socketRef.current.emit("join chat", selectedChat._id);
        }
    }, [selectedChat, socketRef]);

    // Fetch messages whenever chat changes
    useEffect(() => {
        if (!selectedChat) return;

        const fetchMessages = async () => {
            setLoadingMessages(true); // start loading
            try {
                const response = await axios.get(
                    `${backendURL}/api/message/fetch/${selectedChat._id}`,
                    { withCredentials: true }
                );
                if (response.data.success) {

                    setMessages(response.data.messages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoadingMessages(false); // stop loading
            }
        };

        fetchMessages();
    }, [selectedChat, backendURL]);

    const typingHandler = (e) => {
        setInput(e.target.value);
        if (!socketRef.current) return;

        if (!typing) {
            setTyping(true);
            socketRef.current.emit("typing", selectedChat._id);
        }

        let lastTypingTime = Date.now();
        setTimeout(() => {
            if (Date.now() - lastTypingTime >= 4000 && typing) {
                socketRef.current.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, 4000);
    };


    const handleSend = async () => {
        if (!input.trim() || !selectedChat) return;

        // --- Step 1: Create a temp message (optimistic UI)
        const tempMessage = {
            _id: Date.now().toString(), // fake ID until server responds
            sender: user,
            content: input,
            chat: selectedChat._id,
            optimistic: true, // flag to identify it
        };

        setMessages((prev) => [...prev, tempMessage]); // show immediately
        setInput("");

        try {
            // --- Step 2: Send to server
            const response = await axios.post(
                `${backendURL}/api/message/send`,
                { chatId: selectedChat._id, content: tempMessage.content },
                { withCredentials: true }
            );

            if (response.data.success) {
                const newMessage = response.data.newMessage;

                // --- Step 3: Replace temp message with real one
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg._id === tempMessage._id ? newMessage : msg
                    )
                );

                socketRef.current.emit("new message", newMessage);
                socketRef.current.emit("stop typing", selectedChat._id);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            // --- Step 4: Rollback on failure (optional)
            setMessages((prev) => prev.filter((msg) => msg._id !== tempMessage._id));
        }
    };


    if (!selectedChat) {

        return (
            <GreetingSequence />
        );
    }

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "rgba(47, 47, 47, 0.05)", border: "0.5px solid rgba(255, 255, 255, 0.12)", borderRadius: "12px", mt: 5, overflow: "hidden", borderLeft: "none", borderRight: "none" }}>
            {/* Chat messages */}
            <Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1.5, height: "60vh" }}>
                <ScrollableFeed forceScroll={true} className="scrollable-chat">
                    {loadingMessages ? (
                        // Show skeletons (mix left + right)
                        Array.from({ length: 10 }).map((_, i) => {
                            const isMe = i % 2 === 0; // alternate left/right for demo
                            return (
                                <Box
                                    key={i}
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        justifyContent: isMe ? "flex-end" : "flex-start",
                                        gap: 1,
                                        mb: 1,
                                    }}
                                >
                                    {/* LEFT avatar for incoming */}
                                    {!isMe && <Skeleton variant="circular" width={35} height={35} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />}

                                    {/* Message bubble */}
                                    <Skeleton
                                        variant="rectangular"
                                        width="30%"
                                        height={20}
                                        sx={{
                                            borderRadius: 2,
                                            bgcolor: "rgba(255,255,255,0.2)",
                                            ml: !isMe ? 0 : "auto",
                                        }}
                                    />

                                    {/* RIGHT avatar for outgoing */}
                                    {isMe && <Skeleton variant="circular" width={35} height={35} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />}
                                </Box>
                            );
                        })
                    ) : (
                        <>
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
                                            mb: 1,
                                        }}
                                    >
                                        {!isMe && (
                                            <Box
                                                component="img"
                                                src={msg.sender.image}
                                                alt={msg.sender.name}
                                                sx={{ width: 35, height: 35, borderRadius: "50%" }}
                                            />
                                        )}

                                        <Box
                                            sx={{
                                                bgcolor: isMe ? "primary.main" : "grey.800",
                                                color: "white",
                                                px: 2,
                                                py: 0.8,
                                                borderRadius: 2,
                                                maxWidth: "65%",
                                                boxShadow: 1,
                                            }}
                                        >
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

                                        {isMe && (
                                            <Box
                                                component="img"
                                                src={msg.sender.image}
                                                alt={msg.sender.name}
                                                sx={{ width: 35, height: 35, borderRadius: "50%" }}
                                            />
                                        )}
                                    </Box>
                                );
                            })}

                            {/* ✅ Typing indicator inside feed */}
                            {isTyping && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        gap: 1,
                                        mb: 1,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={getProfileUser()?.image}
                                        alt={getProfileUser()?.name}
                                        sx={{ width: 35, height: 35, borderRadius: "50%" }}
                                    />

                                    <Box
                                        sx={{
                                            bgcolor: "grey.700",
                                            borderRadius: 2,
                                            px: 1.5,
                                            py: 0.8,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.6,
                                            maxWidth: "65%",
                                            boxShadow: 1,
                                        }}
                                    >
                                        {[0, 0.2, 0.4].map((delay, i) => (
                                            <Box
                                                key={i}
                                                sx={{
                                                    width: 6,
                                                    height: 6,
                                                    bgcolor: "white",
                                                    borderRadius: "50%",
                                                    animation: "blink 1.4s infinite both",
                                                    animationDelay: `${delay}s`,
                                                }}
                                            />
                                        ))}
                                    </Box>

                                    <style>
                                        {`
              @keyframes blink {
                0% { opacity: .2; }
                20% { opacity: 1; }
                100% { opacity: .2; }
              }
            `}
                                    </style>
                                </Box>
                            )}
                        </>
                    )}

                </ScrollableFeed>
            </Box>



            {/* visible icon */}
            <VisibleIcon setProfileUser={setProfileUser} setOpenProfile={setOpenProfile} getProfileUser={getProfileUser} />

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
                    onChange={(e) => typingHandler(e)}
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