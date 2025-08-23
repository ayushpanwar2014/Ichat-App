import { Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../context/exportAppContext";


export default function Register() {

    const { setUserImg, userImg, signUp, setSignUp, onSubmitRegister } = useContext(AppContext);

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setUserImg(e.target.files[0]);
        }
    }

    const onChangeHandler = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }

    return (
        <Box
            sx={{
                marginTop: '-20px',
                width: "100%",
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 1, md: 1, lg: 1 },
            }}
        >
            {/* Profile */}
            <label htmlFor="file">
                <img src={userImg ? URL.createObjectURL(userImg) : "./src/assets/avatar.png"} alt="" />
                <input type="file" id='file' style={{ display: 'none' }} onChange={handleAvatar} />
            </label>

            {/* Username */}
            <TextField
                fullWidth
                variant="outlined"
                label="Username"
                type="text"
                name="name"
                autoComplete="name"
                onChange={onChangeHandler}
                value={signUp.name}
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
                name="email"
                autoComplete="email"
                onChange={onChangeHandler}
                value={signUp.email}
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
                name="password"
                email="password"
                autoComplete="password"
                onChange={onChangeHandler}
                value={signUp.password}
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
                name="confirmPassword"
                autoComplete="password"
                onChange={onChangeHandler}
                value={signUp.confirmPassword}
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
            <Button onClick={onSubmitRegister}
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
