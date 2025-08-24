import { Box } from "@mui/material";

export default function SideBar() {
  return (
      <Box
          sx={{
              marginLeft: "-30px",
              marginTop: 5,
              width: { xs: "37%", sm: "35%", md: "25%" },
              height: '100%',
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
          }}
      >

      </Box>
  )
}
