import { Box } from '@mui/material';
import PeopleIcon from "@mui/icons-material/People";

export default function AllUser({ toggleSidebar }) {
  return (

    <Box
      onClick={toggleSidebar}
      sx={{
        display: "flex",
        gap: "8px",
        position: "absolute",
        zIndex: 30,
        top: "12px",
        left: "174px",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
        transition: "all 0.2s ease",
      }}
    >
      <PeopleIcon sx={{ fontSize: 28, color: "white" }} />
    </Box>
  )
}
