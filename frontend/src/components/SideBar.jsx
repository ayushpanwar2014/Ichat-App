import {
    Box,
    Typography,
    Divider,
    Button
} from "@mui/material";
import { useContext, useState } from "react";
import { ChatContext } from "../context/exportChatContext";
import { AppContext } from "../context/exportAppContext";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddGroup from "./AddGroup";
import ChatList from "./ChatList";
import axios from "axios";
import { notifyError, notifySuccess } from "./notification/toast";

export default function SideBar() {
    const { AllUsersChats, backendURL, onFetchAllUserChats } = useContext(ChatContext);
    const { user } = useContext(AppContext); // ✅ assuming you have allUsers here
    const [openAddGroup, setOpenAddGroup] = useState(false);

    const handleCreateGroup = () => {
        setOpenAddGroup(true);
    };

    const handleCloseGroup = () => {
        setOpenAddGroup(false);
    };


    // Extract users only from chats where chatName === "sender"
    // Extract users only from chats where chatName === "sender"
    const allUniqueUsers = Array.from(
        new Map(
            AllUsersChats
                .filter(chat => chat.chatName === "sender") // only sender chats
                .flatMap(chat => chat.users) // flatten all users
                .filter(u => u._id !== user._id) // 🚫 exclude yourself
                .map(u => [u._id, u]) // deduplicate by id
        ).values()
    );

    const handleGroupCreate = async (groupData) => {
        console.log("Group created:", groupData);

        const { name, members } = groupData;

        const users = members.map((user) => user._id);
        const chatName = name;
        try {
            const resp = await axios.post(backendURL +'/api/chat/creategroup',{chatName, users}, {withCredentials: true} );

            if(resp.data.success){
                notifySuccess(resp.data.msg);
                await onFetchAllUserChats();
            }

        } catch (error) {
            console.log(error);
            notifyError(error.response?.data?.msg);
        }
    };

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
            {/* 🔹 Header: My Chats + New Group */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: "0.9rem", sm: "1.05rem" },
                        fontWeight: 600,
                        color: "whitesmoke",
                        letterSpacing: 0.5,
                    }}
                >
                    My Chats
                </Typography>

                {/* New Group Button */}
                <Button
                    size="large"
                    onClick={handleCreateGroup}
                    variant="contained"
                    sx={{
                        fontSize: 13,
                        borderRadius: 5,
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "whitesmoke",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                    }}
                >
                    <GroupAddIcon sx={{ fontSize: 18, color: "white" }} />
                </Button>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

            {/* 🔹 Chats List */}
            <ChatList user={user} AllUsersChats={AllUsersChats} />

            {/* 🔹 Add Group Dialog Integration */}
            <AddGroup
                open={openAddGroup}
                onClose={handleCloseGroup}
                allUsers={allUniqueUsers} // ✅ pass all users list
                onCreate={handleGroupCreate}
            />
        </Box>
    );
}
