"use client";

import SidebarItem from "./SidebarItem";
import { navigation } from "@/constants/navigation";

export default function AppSidebar() {
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

        {navigation.map((item) => (
          <SidebarItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
          />
        ))}

      </nav>

      <div className="border-t border-slate-700 p-4">

        <p className="font-medium">
          Ibnu Sabil
        </p>

        <p className="text-sm text-slate-400">
          Administrator
        </p>

      </div>

    </aside>
  );
}