import { IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function ChatBoxIcon({ toggleChatBox }) {
    return (
        <IconButton
            onClick={toggleChatBox}
            sx={{
                display: "flex",
                color: "whitesmoke",
                "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
                transition: "all 0.2s ease",
            }}
        >
            <ChatBubbleOutlineIcon />
        </IconButton>
    );
}

export default ChatBoxIcon;
