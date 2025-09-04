"use client";
import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Sidebarmain: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: { xs: 2, sm: 3, md: 4 },
            pb: 2,
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebarmain;
