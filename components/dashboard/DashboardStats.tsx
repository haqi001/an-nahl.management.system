import StatCard from "@/components/common/StatCard";
import {
  Users,
  FolderOpen,
  CalendarDays,
  Wallet,
} from "lucide-react";

export default function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Anggota"
        value={28}
        description="+2 anggota baru"
        icon={Users}
      />

      <StatCard
        title="Total Arsip"
        value={145}
        description="+5 dokumen"
        icon={FolderOpen}
      />

      <StatCard
        title="Program Kerja"
        value={12}
        description="4 agenda bulan ini"
        icon={CalendarDays}
      />

      <StatCard
        title="Saldo Kas"
        value="Rp 8.750.000"
        description="Update hari ini"
        icon={Wallet}
      />
    </div>
  );
}