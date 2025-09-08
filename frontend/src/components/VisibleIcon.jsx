import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton } from "@mui/material";


export default function VisibleIcon({   setProfileUser, setOpenProfile, getProfileUser }) {


    return (

        <Box
            sx={{
                display: "flex",
                gap: "20px",
                position: "absolute",
                zIndex: 30,
                top: {xs:"50px", md: "28px"},
                left:{ xs :"160px", md: "650px"},
            }}
        >
            <Box
                sx={{
                    marginTop: "-8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
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



