import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Typography } from "@mui/material";


export default function VisibleIcon({   setProfileUser, setOpenProfile, getProfileUser }) {


    return (

        <Box
            sx={{
                display: "flex",
                gap: "20px",
                position: "absolute",
                top: {xs:"9px"},
                left:{ xs :"100px", md: "500px"},
            }}
        >
            <Box
                sx={{
                    marginTop: "-8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.1)", cursor: "pointer" },
                    transition: "all 0.2s ease",
                }}
            >

                <IconButton
                    sx={{ color: "white" }}
                    onClick={() => {
                        setProfileUser(getProfileUser());
                        setOpenProfile(true);
                    }}
                >
                    <VisibilityIcon />
                </IconButton>
            </Box>
        </Box>
    )
}



