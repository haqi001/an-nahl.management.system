import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FolderOpen,
  Wallet,
  Trophy,
  Settings,
} from "lucide-react";

const menus = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Members", href: "/members", icon: Users },
  { title: "Timeline", href: "/timeline", icon: CalendarDays },
  { title: "Archive", href: "/archive", icon: FolderOpen },
  { title: "Cash Flow", href: "/cashflow", icon: Wallet },
  { title: "Competitions", href: "/competitions", icon: Trophy },
  { title: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-6">
      <h2 className="mb-8 text-2xl font-bold text-emerald-600">
        AMS
      </h2>

      <nav className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-600"
            >
              <Icon className="h-5 w-5" />
              {menu.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}