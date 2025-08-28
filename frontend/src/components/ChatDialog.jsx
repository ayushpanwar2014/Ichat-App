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
    Button,
    TextField,
    Skeleton,
    ListItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { AppContext } from "../context/exportAppContext";
import axios from "axios";
import { addedToGroup, notifyError, removeToGroup, renameToGroup } from "./notification/toast";
import { ChatContext } from "../context/exportChatContext";

export default function ChatDialog({
    openProfile,
    setOpenProfile,
    isGroup,
    selectedChat,
    profileUser,
}) {
    const [removedUsers, setRemovedUsers] = useState([]);
    const [addedUsers, setAddedUsers] = useState([]); // ✅ store new users to add
    const [searchResults, setSearchResults] = useState([]);
    const { user, backendURL } = useContext(AppContext);
    const { onFetchAllUserChats, setSelectedChat } = useContext(ChatContext); // ✅ add setter
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [search, setSearch] = useState("")
    const [newGroupName, setNewGroupName] = useState(selectedChat?.chatName || "");
    const [renaming, setRenaming] = useState(false);

    const handleRenameGroup = async () => {

        if (!newGroupName.trim()) return notifyError("Please enter a group name");

        setRenaming(true);
        try {
            const resp = await axios.put(
                `${backendURL}/api/chat/renamechatgroup`,
                { chatId: selectedChat._id, newChatName: newGroupName },
                { withCredentials: true }
            );

            if (resp.data.success) {
                renameToGroup(resp.data.msg);
                // Update the selected chat locally
                setSelectedChat(resp.data.data);
                onFetchAllUserChats();
            }
        } catch (error) {
            notifyError(error.response?.data?.msg || "Error renaming group");
        } finally {
            setRenaming(false);
        }
    };


    const handleToggleUser = (userId) => {
        setRemovedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    // ✅ Handle search for users
    const handleSearchUser = async () => {
        if (search.length === 0) {
            setSearch("");
            setSearchResults([]);
            return notifyError("Please Provide Name or Email !");
        }

        setLoadingSearch(true); // ✅ start loader
        try {
            const resp = await axios.get(
                backendURL + `/api/user/alluser?search=${search}`,
                { withCredentials: true }
            );
            if (resp.data.success) {
                setSearchResults(resp.data.data);
                setSearch("")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingSearch(false); // ✅ stop loader
        }
    };


    // ✅ Add user to array
    const handleAddUser = (user) => {
        if (!addedUsers.some((u) => u._id === user._id)) {
            setAddedUsers((prev) => [...prev, user]);
        }
    };

    // ✅ Remove from addedUsers
    const handleRemoveAddedUser = (userId) => {
        setAddedUsers((prev) => prev.filter((u) => u._id !== userId));
    };

    const onClickAddUser = async () => {
        const newUsers = addedUsers.map((u) => u._id);
        const chatId = selectedChat._id;

        try {

            const resp = await axios.put(backendURL + '/api/chat/addtogroup', { chatId, newUsers }, { withCredentials: true });

            if (resp.data.success) {
                addedToGroup(resp.data.msg);

                // ✅ Update selectedChat locally
                const updatedChat = {
                    ...selectedChat,
                    users: [...selectedChat.users, ...addedUsers],
                };
                setSelectedChat(updatedChat);

                setAddedUsers([]); // clear selection
                await onFetchAllUserChats();
            }

        } catch (error) {
            notifyError(error.response.data.msg);
        }

    }

    const handleRemoveSelected = async () => {
        if (removedUsers.length === 0) return;

        const chatId = selectedChat._id;
        const removeUsers = removedUsers;
        try {
            const resp = await axios.put(
                backendURL + "/api/chat/removefromgroup",
                { chatId, removeUsers },
                { withCredentials: true }
            );

            if (resp.data.success) {
                removeToGroup(resp.data.msg);

                // ✅ Update selectedChat locally
                const updatedChat = {
                    ...selectedChat,
                    users: selectedChat.users.filter((u) => !removedUsers.includes(u._id)),
                };
                setSelectedChat(updatedChat);

                setRemovedUsers([]); // clear selection
                await onFetchAllUserChats();
            }

        } catch (error) {
            console.log(error);
            notifyError(error.response?.data?.msg || "Error removing users");
        }
    };

    return (
        <Dialog
            open={openProfile}
            onClose={() => { setOpenProfile(false); setSearchResults([]); }}
            PaperProps={{
                sx: {
                    backgroundColor: "rgba(101, 38, 38, 0.35)",
                    border: "0.5px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 3,
                    backdropFilter: "blur(10px) saturate(180%)",
                    WebkitBackdropFilter: "blur(10px) saturate(180%)",
                    color: "whitesmoke",
                    minWidth: 340,
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
                        {/* Group Admin */}
                        <Typography variant="h6" mb={1}>
                            Group Admin: {selectedChat.groupAdmin.name}
                        </Typography>

                        {isGroup && selectedChat?.groupAdmin?._id === user._id && (
                            <>
                                {/* Rename Group */}
                                <Box sx={{ display: "flex", gap: 1, mb: 2, mt: 1 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="New group name"
                                        variant="outlined"
                                        value={newGroupName}
                                        onChange={(e) => setNewGroupName(e.target.value)}
                                        sx={{
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            borderRadius: 5,
                                            "& .MuiInputBase-input": { color: "whitesmoke" },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": { border: "none" },
                                                "&:hover fieldset": { border: "none" },
                                                "&.Mui-focused fieldset": { border: "none" },
                                            },
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={handleRenameGroup}
                                        disabled={renaming}
                                        sx={{
                                            height: 50,
                                            px: 4,
                                            fontSize: 11,
                                            borderRadius: 5,
                                            backgroundColor: "rgba(255,255,255,0.15)",
                                            color: "whitesmoke",
                                            "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                                        }}
                                    >
                                        {renaming ? "Renaming..." : "Rename"}
                                    </Button>
                                </Box>

                                {/* Search User to Add */}
                                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Search user to add..."
                                        variant="outlined"
                                        type="text"
                                        name="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        sx={{
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            borderRadius: 5,
                                            "& .MuiInputBase-input": { color: "whitesmoke" },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": { border: "none" },
                                                "&:hover fieldset": { border: "none" },
                                                "&.Mui-focused fieldset": { border: "none" },
                                            },
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        sx={{
                                            height: 50,
                                            fontSize: 13,
                                            borderRadius: 5,
                                            backgroundColor: "rgba(255,255,255,0.15)",
                                            color: "whitesmoke",
                                            "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                                        }}
                                        onClick={handleSearchUser}
                                    >
                                        Go
                                    </Button>
                                </Box>
                            </>
                        )}

                        {/* ✅ Show Added Users */}
                        {addedUsers.length > 0 && (
                            <Box mb={2}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    Selected to Add:
                                </Typography>
                                <List
                                    sx={{
                                        maxHeight: 80,
                                        overflowY: "auto",
                                        "&::-webkit-scrollbar": { display: "none" },
                                    }}
                                >
                                    {addedUsers.map((u) => (
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
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Avatar src={u.image} sx={{ width: 28, height: 28 }} />
                                                <Typography>{u.name}</Typography>
                                            </Box>
                                            <IconButton
                                                size="small"
                                                sx={{ color: "red" }}
                                                onClick={() => handleRemoveAddedUser(u._id)}
                                            >
                                                <ClearIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </List>
                            </Box>
                        )}

                        {/* ✅ Search Results */}
                        {loadingSearch ? (
                            <List>
                                {[1, 2].map((i) => (
                                    <ListItem
                                        key={i}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            borderBottom: "0.5px solid rgba(255, 255, 255, 0.28)",
                                            borderRadius: 12,
                                            marginTop: 1,
                                            py: 1,
                                        }}
                                    >
                                        {/* Avatar skeleton */}
                                        <Skeleton
                                            variant="circular"
                                            width={35}
                                            height={35}
                                            sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
                                        />
                                        {/* Text skeleton */}
                                        <Skeleton
                                            variant="text"
                                            width="60%"
                                            height={20}
                                            sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        ) : searchResults.length > 0 && (
                            <Box mb={2}>
                                <Typography variant="subtitle2">Search Results:</Typography>
                                <List
                                    sx={{
                                        maxHeight: 120,
                                        overflowY: "auto",
                                        "&::-webkit-scrollbar": { display: "none" },
                                    }}
                                >
                                    {searchResults.map((u) => (
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
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Avatar src={u.image} sx={{ width: 28, height: 28 }} />
                                                <Typography>{u.name}</Typography>
                                            </Box>
                                            <IconButton
                                                size="small"
                                                sx={{ color: "lightgreen" }}
                                                onClick={() => handleAddUser(u)}
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </List>
                            </Box>
                        )}


                        <Divider sx={{ my: 1, bgcolor: "rgba(255,255,255,0.3)" }} />

                        {/* Existing group members */}
                        <Typography mb={1} fontWeight={600}>
                            Group Members:
                        </Typography>
                        <List
                            sx={{
                                maxHeight: 250,
                                overflowY: "auto",
                                "&::-webkit-scrollbar": { display: "none" },
                            }}
                        >
                            {selectedChat.users
                                .filter((u) => u._id !== user._id)
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
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Avatar src={u.image} sx={{ width: 28, height: 28 }} />
                                                <Typography>{u.name}</Typography>
                                            </Box>
                                            {isGroup && selectedChat?.groupAdmin?._id === user._id &&
                                                <IconButton
                                                    size="small"
                                                    sx={{ color: isRemoved ? "lightgreen" : "white" }}
                                                    onClick={() => handleToggleUser(u._id)}
                                                >
                                                    {isRemoved ? <AddIcon fontSize="small" /> : <ClearIcon fontSize="small" />}
                                                </IconButton>}
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
                                        mr: 1
                                    }}
                                >
                                    Remove {removedUsers.length} User
                                    {removedUsers.length > 1 ? "s" : ""}
                                </Button>
                            </Box>
                        )}

                        {/* ✅ Add Users Button */}
                        {addedUsers.length > 0 && (
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={onClickAddUser}
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: 2,
                                        px: 2,
                                        py: 0.5,
                                        fontWeight: 600,
                                    }}
                                >
                                    Add {addedUsers.length} User
                                    {addedUsers.length > 1 ? "s" : ""}
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
