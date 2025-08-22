import React from "react";
import { Box } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function MacOSButtons() {
  const handleBack = () => {
    window.history.back();
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleForward = () => {
    window.history.forward();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        position: "absolute",
        top: "12px",
        left: "12px",
      }}
    >
      {/* Red - Back */}
      <Box
        onClick={handleBack}
        sx={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: "#ff5f57",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
          transition: "all 0.2s ease",
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: 10, color: "white" }} />
      </Box>

      {/* Yellow - Reload */} 
      <Box
        onClick={handleReload}
        sx={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: "#ffbd2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
          transition: "all 0.2s ease",
        }}
      >
        <ReplayIcon sx={{ fontSize: 10 }} />
      </Box>
      
      {/* Green - Forward */}
      <Box
        onClick={handleForward}
        sx={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: "#28c940",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
          transition: "all 0.2s ease",
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 9 }} />
      </Box>
    </Box>
  );
}

export default MacOSButtons;
