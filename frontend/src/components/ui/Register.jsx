import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Register() {

    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    return (
        <Box
            sx={{
                marginTop: '-20px',
                width: "100%",
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                gap: {xs: 2,sm: 1,md: 1, lg: 1},
            }}
        >
            {/* Profile */}
            <label htmlFor="file">
                <img src={avatar.url || "./src/assets/avatar.png"} alt="" />
                <input type="file" id='file' style={{ display: 'none' }} onChange={handleAvatar} />
            </label>

            {/* Username */}
            <TextField
                fullWidth
                variant="outlined"
                label="Username"
                type="text"
                sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 5,
                    "& .MuiInputBase-input": { color: "whitesmoke" },
                    "& .MuiInputLabel-root": { color: "whitesmoke" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { border: 'none' },
                        "&:hover fieldset": { border: 'none' },
                        "&.Mui-focused fieldset": { border: 'none' },
                    },
                }}
            />

            {/* Email */}
            <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 5,
                    "& .MuiInputBase-input": { color: "whitesmoke" },
                    "& .MuiInputLabel-root": { color: "whitesmoke" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { border: 'none' },
                        "&:hover fieldset": { border: 'none' },
                        "&.Mui-focused fieldset": { border: 'none' },
                    },
                }}
            />

            {/* Password */}
            <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 5,
                    "& .MuiInputBase-input": { color: "whitesmoke" },
                    "& .MuiInputLabel-root": { color: "whitesmoke" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { border: 'none' },
                        "&:hover fieldset": { border: 'none' },
                        "&.Mui-focused fieldset": { border: 'none' },
                    },
                }}
            />

            {/* Confirm Password */}
            <TextField
                fullWidth
                variant="outlined"
                label="Confirm Password"
                type="password"
                sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 5,
                    "& .MuiInputBase-input": { color: "whitesmoke" },
                    "& .MuiInputLabel-root": { color: "whitesmoke" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { border: 'none' },
                        "&:hover fieldset": { border: 'none' },
                        "&.Mui-focused fieldset": { border: 'none' },
                    },
                }}
            />

            {/* Sign Up Button */}
            <Button
                fullWidth
                sx={{
                    mb: -3,
                    py: 1.5,
                    background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                }}
            >
                Sign Up
            </Button>
        </Box>
    );
}
