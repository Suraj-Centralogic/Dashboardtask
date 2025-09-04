import React from "react";
import {
  Stack,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { alpha } from "@mui/material/styles";

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent="space-between"
      gap={2}
      sx={{
        p: { xs: 2, sm: 1, md: 2 },
        ml: { xs: "65px", md: 0 },
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 10,
        bgcolor: theme.palette.background.default,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
          display: "inline-flex",
          "& .wave": {
            display: "inline-block",
            transformOrigin: "70% 70%",
            animation: "wave 2s infinite",
          },
          "@keyframes wave": {
            "0%": { transform: "rotate(0deg)" },
            "15%": { transform: "rotate(14deg)" },
            "30%": { transform: "rotate(-8deg)" },
            "45%": { transform: "rotate(14deg)" },
            "60%": { transform: "rotate(-4deg)" },
            "75%": { transform: "rotate(10deg)" },
            "100%": { transform: "rotate(0deg)" },
          },
        }}
      >
        Hello Evano <span className="wave">👋</span>
      </Typography>

      <TextField
        placeholder="Search"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon color="disabled" />
            </InputAdornment>
          ),
        }}
        sx={{
          minWidth: { xs: "100%", md: 280 },
          "& .MuiOutlinedInput-root": {
            borderRadius: 999,
            bgcolor:
              theme.palette.mode === "light"
                ? alpha("#fff", 0.9)
                : theme.palette.background.paper,
            boxShadow:
              theme.palette.mode === "light"
                ? `0 6px 18px ${alpha("#000", 0.05)}`
                : "none",
          },
        }}
      />
    </Stack>
  );
};

export default Header;
