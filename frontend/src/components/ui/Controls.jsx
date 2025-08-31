import { Box } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useProgress } from "../../context/ProgressContext";

function MacOSButtons({t,r}) {

  const { startProgress, completeProgress } = useProgress();

  const handleBack = () => {
    startProgress();
    window.history.back();
    completeProgress();
  };

  const handleReload = () => {
    startProgress();
    window.location.reload();
    completeProgress();
  };

  const handleForward = () => {
    startProgress();
    window.history.forward();
    completeProgress();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        position: "absolute",
        top: t,
        left: r,
        zIndex: 30
      }}
    >
      {/* Red - Back */}
      <Box
        onClick={handleBack}
        sx={{
          width: "17px",
          height: "17px",
          borderRadius: "50%",
          backgroundColor: "#ff5f57",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
          transition: "all 0.2s ease",
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: 10, color: "black" }} />
      </Box>

      {/* Yellow - Reload */}
      <Box
        onClick={handleReload}
        sx={{
          width: "17px",
          height: "17px",
          borderRadius: "50%",
          backgroundColor: "#ffbd2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
          transition: "all 0.2s ease",
        }}
      >
        <ReplayIcon sx={{ fontSize: 10, color: 'black' }} />
      </Box>

      {/* Green - Forward */}
      <Box
        onClick={handleForward}
        sx={{
          width: "17px",
          height: "17px",
          borderRadius: "50%",
          backgroundColor: "#28c940",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
          transition: "all 0.2s ease",
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 10, color: 'black' }} />
      </Box>
    </Box>
  );
}

export default MacOSButtons;
