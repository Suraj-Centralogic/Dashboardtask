import type { SvgIconComponent } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CampaignIcon from "@mui/icons-material/Campaign";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export type NavItem = {
  label: string;
  href: string;
  icon: SvgIconComponent;
  count?: number;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/", icon: DashboardIcon },
  { label: "Product", href: "/product", icon: Inventory2Icon },
  { label: "Customers", href: "/customers", icon: GroupIcon, count: 8 },
  { label: "Income", href: "/income", icon: TrendingUpIcon },
  { label: "Promote", href: "/promote", icon: CampaignIcon },
  { label: "Help", href: "/help", icon: HelpOutlineIcon },
];
