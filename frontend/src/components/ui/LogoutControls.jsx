import { useContext } from 'react'
import { Box } from "@mui/material";
import { AppContext } from '../../context/exportAppContext';
import LogoutIcon from '@mui/icons-material/Logout';
export default function LogoutControls() {
    const {fetchLogout} = useContext(AppContext);
  return (
      <Box
          sx={{
              display: "flex",
              gap: "8px",
              position: "absolute",
              top: "12px",
              right: "12px",
          }}
      >
          {/* Red - Back */}
          <Box
              onClick={fetchLogout}
              sx={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#0073ffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
                  transition: "all 0.2s ease",
              }}
          >
              <LogoutIcon sx={{ fontSize: 13, color: 'black' }} />
          </Box>

      </Box>
  )
}
