import { Box, Button, TextField } from "@mui/material";

export default function Register() {
    return (
        <Box
            sx={{
                marginTop: '-20px',
                width: "100%",
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}
        >
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

            {/* Upload Picture */}
            <Button
                component="label"
                fullWidth
                sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "whitesmoke",
                    fontWeight: "bold",
                    borderRadius: 5,
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    textTransform: "none",
                    py: 1.5,
                }}
            >
                Upload Picture
                <input type="file" hidden />
            </Button>

            {/* Sign Up Button */}
            <Button
                fullWidth
                sx={{
                    mt: 1,
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
