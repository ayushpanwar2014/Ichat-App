import ChatIcon from "@mui/icons-material/Chat";
import { Box } from '@mui/material';

export default function MessageIcon({ toggleSidebar }) {
  return (

      <Box
          onClick={toggleSidebar}
          sx={{
              display: "flex",
              gap: "8px",
              position: "absolute",
              top: "13px",
              left: "120px",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
              transition: "all 0.2s ease",
          }}
      >
          <ChatIcon sx={{ fontSize: 23, color: "white" }} />
        </Box> 
  )
}
