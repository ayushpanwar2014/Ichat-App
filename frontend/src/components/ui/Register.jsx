import React from 'react'
import { Container, Box, Typography, Button, TextField, Link } from "@mui/material";

export default function Register() {
    return (


        <Box
            sx={{
                width: "100%",
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: { xs: 10, lg: 3 },
            }}
        >
            {/* Email */}
            <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 5,
                    "& .MuiInputBase-input": {
                        color: "whitesmoke",
                    },
                    "& .MuiInputLabel-root": {
                        color: "whitesmoke",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            border: 'none'
                        },
                        "&:hover fieldset": {
                            border: 'none'
                        },
                        "&.Mui-focused fieldset": {
                            border: 'none'
                        },
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
                    backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 5,
                    "& .MuiInputBase-input": {
                        color: "whitesmoke",
                    },
                    "& .MuiInputLabel-root": {
                        color: "whitesmoke",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            border: 'none'
                        },
                        "&:hover fieldset": {
                            border: 'none'
                        },
                        "&.Mui-focused fieldset": {
                            border: 'none'
                        },
                    },
                }}
            />

            <Button
                fullWidth
                sx={{
                    mt: 10, py: 1.5,
                    background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)", // gradient
                    color: "white", fontWeight: "bold", fontSize: "1rem", borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",

                }}
            >
                Create Account
            </Button>
        </Box>

    )
}
