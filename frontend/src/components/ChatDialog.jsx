import {
    Dialog,
    DialogTitle,
    DialogContent,
    Avatar,
    Typography,
    IconButton,
    Box,
    List,
    Divider,
    Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { AppContext } from "../context/exportAppContext";
import axios from "axios";
import { notifyError, notifySuccess } from "./notification/toast";
import { ChatContext } from "../context/exportChatContext";

export default function ChatDialog({
    openProfile,
    setOpenProfile,
    isGroup,
    selectedChat,
    profileUser,
}) {
    const [removedUsers, setRemovedUsers] = useState([]);
    const { user, backendURL } = useContext(AppContext);
    const { onFetchAllUserChats } = useContext(ChatContext);

    const handleToggleUser = (userId) => {
        setRemovedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const handleRemoveSelected = async () => {
        if (removedUsers.length === 0) return;
        console.log("Chat Id",selectedChat._id);
        
        console.log('Remove user',removedUsers);

        const chatId = selectedChat._id
        const removeUsers = removedUsers;
        try {

            const resp = await axios.put(backendURL+'/api/chat/removefromgroup', { chatId, removeUsers }, {withCredentials: true});

            if(resp.data.success){
                notifySuccess(resp.data.msg);
                setRemovedUsers([]); // clear after removal
                await onFetchAllUserChats()
            }
        } catch (error) {
            console.log(error);
            notifyError(error.response.data.msg)
        }
     
    };

    return (
        <Dialog
            open={openProfile}
            onClose={() => setOpenProfile(false)}
            PaperProps={{
                sx: {
                    backgroundColor: "rgba(101, 38, 38, 0.35)",
                    border: "0.5px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 3,
                    backdropFilter: "blur(10px) saturate(180%)",
                    WebkitBackdropFilter: "blur(10px) saturate(180%)",
                    color: "whitesmoke",
                    minWidth: 320,
                },
            }}
        >
            <DialogTitle
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
                Profile
                <IconButton onClick={() => setOpenProfile(false)} sx={{ color: "whitesmoke" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ textAlign: "center" }}>
                {isGroup ? (
                    <Box>
                        <Typography variant="h6" mb={1}>
                            Group Admin: {selectedChat.groupAdmin.name}
                        </Typography>

                        {/* Removed Users Section */}
                        {removedUsers.length > 0 && (
                            <Box mb={2}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    Selected for Removal:
                                </Typography>
                                <List
                                    sx={{
                                        maxHeight: 100,
                                        overflowY: "auto",
                                        "&::-webkit-scrollbar": { display: "none" },
                                    }}
                                >
                                    {selectedChat.users
                                        .filter((u) => removedUsers.includes(u._id))
                                        .map((u) => (
                                            <Box
                                                key={u._id}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    gap: 1,
                                                    borderBottom: "0.5px solid rgba(255, 255, 255, 0.28)",
                                                    borderRadius: 10,
                                                    height: 45,
                                                    mb: 1,
                                                    px: 1,
                                                    "&:hover": {
                                                        backgroundColor: "rgba(255,255,255,0.05)",
                                                    },
                                                }}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <Avatar src={u.image} sx={{ width: 28, height: 28 }} />
                                                    <Typography>{u.name}</Typography>
                                                </Box>
                                                <IconButton
                                                    size="small"
                                                    sx={{ color: "lightgreen" }}
                                                    onClick={() => handleToggleUser(u._id)}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        ))}
                                </List>
                                <Divider sx={{ my: 1, bgcolor: "rgba(255,255,255,0.3)" }} />
                            </Box>
                        )}

                        {/* All Users Section */}
                        <Typography mb={1} fontWeight={600}>
                            Group Members:
                        </Typography>
                        <List
                            sx={{
                                maxHeight: 280,
                                overflowY: "auto",
                                "&::-webkit-scrollbar": { display: "none" },
                            }}
                        >
                            {selectedChat.users
                                .filter((u) => u._id !== user._id) // ✅ exclude yourself
                                .map((u) => {
                                    const isRemoved = removedUsers.includes(u._id);
                                    return (
                                        <Box
                                            key={u._id}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                gap: 1,
                                                borderBottom: "0.5px solid rgba(255, 255, 255, 0.28)",
                                                borderRadius: 10,
                                                height: 45,
                                                mb: 1,
                                                px: 1,
                                                opacity: isRemoved ? 0.5 : 1,
                                                "&:hover": {
                                                    backgroundColor: "rgba(255,255,255,0.05)",
                                                },
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Avatar src={u.image} sx={{ width: 28, height: 28 }} />
                                                <Typography>{u.name}</Typography>
                                            </Box>
                                            <IconButton
                                                size="small"
                                                sx={{ color: isRemoved ? "lightgreen" : "white" }}
                                                onClick={() => handleToggleUser(u._id)}
                                            >
                                                {isRemoved ? (
                                                    <AddIcon fontSize="small" />
                                                ) : (
                                                    <ClearIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </Box>
                                    );
                                })}
                        </List>

                        {/* ✅ Remove Users Button */}
                        {removedUsers.length > 0 && (
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={handleRemoveSelected}
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: 2,
                                        px: 2,
                                        py: 0.5,
                                        fontWeight: 600,
                                    }}
                                >
                                    Remove {removedUsers.length} User
                                    {removedUsers.length > 1 ? "s" : ""}
                                </Button>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar src={profileUser?.image} sx={{ width: 80, height: 80, mb: 2 }} />
                        <Typography variant="h6">{profileUser?.name}</Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                            {profileUser?.email}
                        </Typography>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}
