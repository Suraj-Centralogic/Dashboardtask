import type { SvgIconComponent } from '@mui/icons-material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export type NavItem = {
  label: string;
  key: string;
  icon: SvgIconComponent;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: DashboardOutlinedIcon,
    href: '/',
  },
  {
    label: 'Product',
    key: 'product',
    icon: StorefrontOutlinedIcon,
    href: '/product',
  },
  {
    label: 'Customers',
    key: 'customers',
    icon: PermIdentityOutlinedIcon,
    href: '/customers',
  },
  {
    label: 'Income',
    key: 'income',
    icon: MonetizationOnOutlinedIcon,
    href: '/income',
  },
  {
    label: 'Promote',
    key: 'promote',
    icon: CampaignOutlinedIcon,
    href: '/promote',
  },
  { label: 'Help', key: 'help', icon: HelpOutlineOutlinedIcon, href: '/help' },
];
