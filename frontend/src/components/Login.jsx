import { Box, Button, TextField } from "@mui/material";
import { AppContext } from "../context/exportAppContext";
import { useContext } from "react";

function Login() {
    const { Login, setLogin, onSubmitLogin } = useContext(AppContext);

    const onChangeHandler = (e) => {
        setLogin({ ...Login, [e.target.name]: e.target.value });
    };

    return (
        <Box
            component="form"
            onSubmit={onSubmitLogin}
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
                name="email"
                value={Login.email}
                onChange={onChangeHandler}
                sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 5,
                    "& .MuiInputBase-input": { color: "whitesmoke" },
                    "& .MuiInputLabel-root": { color: "whitesmoke" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { border: "none" },
                        "&:hover fieldset": { border: "none" },
                        "&.Mui-focused fieldset": { border: "none" },
                    },
                    "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.05) inset",
                        borderRadius: 5,
                        WebkitTextFillColor: "whitesmoke",
                        caretColor: "whitesmoke",
                        transition: "background-color 9999s ease-in-out 0s",
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
                value={Login.password}
                onChange={onChangeHandler}
                sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 5,
                    "& .MuiInputBase-input": { color: "whitesmoke" },
                    "& .MuiInputLabel-root": { color: "whitesmoke" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { border: "none" },
                        "&:hover fieldset": { border: "none" },
                        "&.Mui-focused fieldset": { border: "none" },
                    },
                    "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.05) inset",
                        borderRadius: 5,
                        WebkitTextFillColor: "whitesmoke",
                        caretColor: "whitesmoke",
                        transition: "background-color 9999s ease-in-out 0s",
                    },
                }}
            />

            <Button
                type="submit" // 🔑 important
                fullWidth
                sx={{
                    mt: 10,
                    py: 1.5,
                    background: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                }}
            >
                Login
            </Button>
        </Box>
    );
}

export default Login;
