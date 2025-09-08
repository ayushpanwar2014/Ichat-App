import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

export default function SearchButton({toggleDrawer}) {
  return (
      <Box
          onClick={toggleDrawer}
          sx={{
              display: "flex",
              gap: "8px",
              zIndex: 30,
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
