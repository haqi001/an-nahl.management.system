import {
  Home,
  Users,
  Calendar,
  Wallet,
  Archive,
  Trophy,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Timeline",
    href: "/dashboard/timeline",
    icon: Calendar,
  },
  {
    title: "Cash Flow",
    href: "/dashboard/cashflow",
    icon: Wallet,
  },
  {
    title: "Archive",
    href: "/dashboard/archive",
    icon: Archive,
  },
  {
    title: "Competitions",
    href: "/dashboard/competitions",
    icon: Trophy,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];