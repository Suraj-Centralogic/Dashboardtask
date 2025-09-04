import { Box, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box
      sx={{
        ml: { xs: "73px", md: 0 },
        flex: 1,
        mt: 2,
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h5" fontWeight={600} className="text-balance">
        Dashboard data
      </Typography>
    </Box>
  );
}
