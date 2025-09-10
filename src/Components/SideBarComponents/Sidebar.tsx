import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { NAV_ITEMS } from "./Navitems";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

type SidebarProps = { initialOpen?: boolean };

export function Sidebar({ initialOpen }: SidebarProps) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(initialOpen ?? mdUp);
  const location = useLocation();

  React.useEffect(() => {
    setOpen(mdUp);
  }, [mdUp]);

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        height: "100dvh",
        position: mdUp ? "relative" : "fixed",
        top: 0,
        left: 0,
        zIndex: 1200,
      }}
      aria-label="Primary"
    >
      <Box
        sx={{
          width: open ? 264 : 78,
          bgcolor: theme.palette.custom.white,
          transition: theme.transitions.create("width", {
            duration: theme.transitions.duration.shorter,
          }),
          overflow: "hidden",

          borderRight: "1px solid",
          borderColor: theme.palette.divider,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            justifyContent: open ? "space-between" : "center",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mt: open ? 0 : 3 }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Dashboard Icon"
              sx={{
                width: open ? 24 : 30,
                height: open ? 24 : 30,
                borderRadius: "10%",
                animation: "rotate 3s linear infinite",
                "@keyframes rotate": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
            {open && (
              <Typography component="h1" variant="h6" fontWeight={700}>
                Dashboard
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ ml: 1, color: "text.secondary" }}
                >
                  v.01
                </Typography>
              </Typography>
            )}
          </Stack>

          <IconButton
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            onClick={() => setOpen((prev) => !prev)}
            sx={{
              position: "absolute",
              top: { xs: 0, md: 5 },
              right: {
                xs: 0,
                sm: open ? 6 : -1,
              },
              zIndex: 1300,
              width: open ? 40 : 30,
              height: open ? 40 : 30,
              padding: 0,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "50%",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                transform: "scale(1.1)",
              },
            }}
          >
            {theme.direction === "rtl" ? (
              open ? (
                <MenuOpenOutlinedIcon
                  sx={{ fontSize: 28, color: theme.palette.primary.main }}
                />
              ) : (
                <MenuOpenOutlinedIcon
                  sx={{ fontSize: 28, color: theme.palette.primary.main }}
                />
              )
            ) : open ? (
              <MenuOpenOutlinedIcon
                sx={{ fontSize: 28, color: theme.palette.primary.main }}
              />
            ) : (
              <MenuOpenOutlinedIcon
                sx={{ fontSize: 28, color: theme.palette.primary.main }}
              />
            )}
          </IconButton>
        </Box>
        <Box sx={{ px: 1, flexGrow: 1 }}>
          <List aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const selected = location.pathname === item.href;
              return (
                <Tooltip
                  key={item.href}
                  title={!open ? item.label : ""}
                  placement="right"
                  arrow
                >
                  <ListItemButton
                    component={Link}
                    to={item.href}
                    selected={selected}
                    sx={{
                      borderRadius: 0.5,
                      gap: open ? 2 : 2,
                      mt: { xs: 1, md: 2 },
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.custom.white,

                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                        },
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.custom.white,
                      },
                      justifyContent: open ? "flex-start" : "center",
                      px: open ? 2 : 0,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: selected
                          ? theme.palette.custom.white
                          : theme.palette.custom.ruby,
                        minWidth: 36,
                        gap: 12,
                        justifyContent: "center",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          transition: "transform 0.2s ease",
                        },
                      }}
                    >
                      <Icon sx={{ fontSize: 28 }} />
                    </ListItemIcon>

                    {open && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              fontWeight={600}
                              color={
                                selected
                                  ? theme.palette.custom.white
                                  : "#000000ff"
                              }
                              sx={{ fontSize: "16px" }}
                            >
                              {item.label}
                            </Typography>
                          }
                        />
                        <NavigateNextIcon
                          sx={{
                            color: selected
                              ? theme.palette.custom.white
                              : theme.palette.custom.ruby,
                            fontSize: 20,
                          }}
                        />
                      </Box>
                    )}
                  </ListItemButton>
                </Tooltip>
              );
            })}
          </List>
          {open && (
            <Box
              role="complementary"
              aria-label="Upgrade"
              sx={{
                mt: { xs: 0, md: 1 },
                mx: 1,
                p: 3,
                borderRadius: 3,
                background:
                  "linear-gradient(107.91deg, #EAABF0 7.37%, #4623E9 95.19%)",
                color: "primary.contrastText",
                boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <RocketLaunchRoundedIcon />
                <Typography fontWeight={800}>Upgrade to Pro</Typography>
              </Stack>
              <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>
                Upgrade to PRO to access all features!
              </Typography>
              <Button
                fullWidth
                color="inherit"
                sx={{
                  mt: 1.5,
                  color: "primary.main",
                  fontWeight: 700,
                  bgcolor: "common.white",
                  "&:hover": { bgcolor: alpha("#fff", 0.9) },
                }}
              >
                Get Pro Now
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={{ p: 2 }}>
          <Divider sx={{ mb: 1.5 }} />
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            justifyContent={open ? "flex-start" : "center"}
          >
            <Avatar
              alt="Evano"
              src="/placeholder.svg"
              sx={{ width: 40, height: 40 }}
            />
            {open && (
              <Box sx={{ minWidth: 0, flexGrow: 1, textAlign: "left" }}>
                <Typography fontWeight={800} noWrap>
                  Evano
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  Project Manager
                </Typography>
              </Box>
            )}
            {open && (
              <Tooltip title="Settings">
                <IconButton size="small" aria-label="Settings">
                  <SettingsRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
