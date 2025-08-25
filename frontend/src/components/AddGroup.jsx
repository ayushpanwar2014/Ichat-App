import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Avatar,
    Button,
    Chip,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function AddGroup({ open, onClose, allUsers, onCreate }) {
    const [groupName, setGroupName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    // filter users based on search
    const filteredUsers = allUsers.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggleUser = (user) => {
        if (selectedUsers.find((u) => u._id === user._id)) {
            setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleCreate = () => {
        if (!groupName.trim() || selectedUsers.length === 0) return;
        onCreate({ name: groupName, members: selectedUsers });
        setGroupName("");
        setSelectedUsers([]);
        setSearchQuery("");
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: "rgba(101, 38, 38, 0.35)",
                    border: "0.5px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 3,
                    backdropFilter: "blur(10px) saturate(180%)",
                    WebkitBackdropFilter: "blur(10px) saturate(180%)",
                    color: "whitesmoke",
                    width: 400,

                },
            }}
        >
            <DialogTitle
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 50, }}
            >
                Create Group
                <IconButton onClick={onClose} sx={{ color: "whitesmoke" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {/* Group Name */}
                <TextField
                    fullWidth
                    label="Group Name"
                    variant="outlined"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    sx={{
                        mt:1,
                        height: 50,
                        mb:1,
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: 5,
                        "& .MuiInputBase-input": { color: "whitesmoke", },
                        "& .MuiInputLabel-root": { color: "whitesmoke" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { border: "none" },
                        },
                    }}
                />

                {/* Search Users */}
                <TextField
                    fullWidth
                    label="Search People"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        height: 50,
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: 5,
                        "& .MuiInputBase-input": { color: "whitesmoke", },
                        "& .MuiInputLabel-root": { color: "whitesmoke" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { border: "none" },
                        },
                    }}
                />

                {/* Selected Users */}
                <div style={{ marginBottom: 12 }}>
                    {selectedUsers.map((user) => (
                        <Chip
                            key={user._id}
                            avatar={<Avatar src={user.image} />}
                            label={user.name}
                            onDelete={() =>
                                setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id))
                            }
                            sx={{
                                backgroundColor: "rgba(255,255,255,0.15)",
                                color: "whitesmoke",
                                mr: 1,
                                mb: 1,
                            }}
                        />
                    ))}
                </div>

                {/* User List */}
                <List
                    sx={{
                        maxHeight: 200,
                        overflowY: "auto",
                        mb: -5,
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {filteredUsers.map((user) => (
                        <ListItem
                            key={user._id}
                            button
                            onClick={() => handleToggleUser(user)}
                            sx={{
                                width: "100%",
                                borderBottom: "0.5px solid rgba(255, 255, 255, 0.28)",
                                borderRadius: 12,
                                height: 50,
                                mb: 1,
                                 "&:hover": {
                                  backgroundColor: "rgba(255,255,255,0.05)",
                                  cursor: "pointer",
                              },
                                backgroundColor: selectedUsers.find((u) => u._id === user._id)
                                    ? "rgba(255,255,255,0.15)"
                                    : "transparent",
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ width: { xs: 28, sm: 35 }, height: { xs: 28, sm: 35 } }} src={user.image} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.name}
                                secondary={user.email}
                                primaryTypographyProps={{ sx: { color: "whitesmoke" } }}
                                secondaryTypographyProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>

            <DialogActions sx={{alignItems: "center"}}>
                <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={!groupName.trim() || selectedUsers.length === 0}
                    sx={{
                        alignItems: "center",
                        height: 50,
                        fontSize: 13,
                        borderRadius: 5,
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "whitesmoke",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                    }}
                >
                    Create Group
                </Button>
            </DialogActions>
        </Dialog>
    );
}
