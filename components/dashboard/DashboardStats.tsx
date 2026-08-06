import StatCard from "@/components/common/StatCard";

import {
  Users,
  Wallet,
  CalendarDays,
  Trophy,
} from "lucide-react";

export default function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Members"
        value="128"
        description="Active members"
        icon={Users}
      />

      <StatCard
        title="Cash Flow"
        value="Rp 5.250.000"
        description="Current balance"
        icon={Wallet}
      />

      <StatCard
        title="Upcoming Events"
        value="12"
        description="Events this month"
        icon={CalendarDays}
      />

      <StatCard
        title="Competitions"
        value="4"
        description="Active competitions"
        icon={Trophy}
      />

    </div>
  );
}