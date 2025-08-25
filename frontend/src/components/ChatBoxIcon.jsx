import { IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function ChatBoxIcon({ toggleChatBox }) {
    return (
        <IconButton
            onClick={toggleChatBox}
            sx={{
                display: "flex",
                gap: "8px",
                position: "absolute",
                top: "1px",
                left: "150px",
                color: "whitesmoke",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" }
            }}
        >
            <ChatBubbleOutlineIcon />
        </IconButton>
    );
}

export default ChatBoxIcon;
