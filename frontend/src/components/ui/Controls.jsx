import React from "react";
import { Box } from "@mui/material";

function MacOSButtons() {
    return (
        <Box
            sx={{
                display: "flex",
                gap: "8px", // spacing between buttons
                position: "absolute",
                top: "12px",
                left: "12px", // Mac buttons are usually on the left
            }}
        >
            {/* Close */}
            <Box
                sx={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#ff5f57",
                    "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
                    transition: "all 0.2s ease",
                }}
            />
            {/* Minimize */}
            <Box
                sx={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#ffbd2e",
                    "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
                    transition: "all 0.2s ease",
                }}
            />
            {/* Maximize / Green */}
            <Box
                sx={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#28c940",
                    "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
                    transition: "all 0.2s ease",
                }}
            />
        </Box>
    );
}

export default MacOSButtons;