"use client";

import SidebarItem from "./SidebarItem";

import { navigation } from "@/constants/navigation";

import { useUserProfile } from "@/components/auth/UserProfileProvider";

import {
  canAccess,
} from "@/services/permission.service";

import {
  PermissionModule,
} from "@/types/permission";

export default function AppSidebar() {
  const {
    user,
    profile,
    loading,
  } = useUserProfile();

  function getModuleFromHref(
    href: string
  ): PermissionModule | null {
    const module = href
      .replace("/dashboard/", "")
      .replace("/dashboard", "");

    switch (module) {
      case "":
        return "dashboard";

      case "members":
        return "members";

      case "timeline":
        return "timeline";

      case "cashflow":
        return "cashflow";

      case "archive":
        return "archive";

      case "competitions":
        return "competitions";

      case "settings":
        return "settings";

      default:
        return null;
    }
  }

  const visibleNavigation =
    navigation.filter((item) => {
      if (!profile) {
        return false;
      }

      const module =
        getModuleFromHref(item.href);

      if (!module) {
        return false;
      }

      return canAccess(
        profile.role,
        module,
        "view"
      );
    });

  return (
    <aside className="flex w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">
          An-Nahl
        </h1>

        <p className="text-sm text-slate-400">
          Management System
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {loading ? (
          <p className="px-3 py-2 text-sm text-slate-400">
            Memuat menu...
          </p>
        ) : (
          visibleNavigation.map(
            (item) => (
              <SidebarItem
                key={item.href}
                title={item.title}
                href={item.href}
                icon={item.icon}
              />
            )
          )
        )}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <p className="font-medium">
          {profile?.name ||
            user?.email ||
            "User"}
        </p>

        <p className="text-sm text-slate-400">
          {profile?.role ||
            "Memuat profil..."}
        </p>
      </div>
    </aside>
  );
}