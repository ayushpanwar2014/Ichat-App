import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

export default function SearchButton({toggleDrawer}) {
  return (
      <Box
          onClick={toggleDrawer}
          sx={{
              display: "flex",
              gap: "8px",
              position: "absolute",
              zIndex: 30,
              top: "13px",
              left: "70px",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { transform: "scale(1.2)", cursor: "pointer" },
              transition: "all 0.2s ease",
          }}
      >
          <SearchIcon sx={{ fontSize: 23, color: "white" }} />
      </Box>
  )
}
