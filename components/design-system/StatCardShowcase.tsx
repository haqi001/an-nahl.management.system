import StatCard from "@/components/common/StatCard";
import {
  Users,
  FolderOpen,
  Trophy,
  Wallet,
} from "lucide-react";

export default function StatCardShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Anggota"
        value={28}
        description="+2 anggota baru bulan ini"
        icon={Users}
      />

      <StatCard
        title="Total Arsip"
        value={145}
        description="+5 dokumen minggu ini"
        icon={FolderOpen}
      />

      <StatCard
        title="Sayembara"
        value={9}
        description="3 masih berlangsung"
        icon={Trophy}
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