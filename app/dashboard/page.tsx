import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import PageHeader from "@/components/common/PageHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivities from "@/components/dashboard/RecentActivities";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="space-y-8 p-8">
          <PageHeader
            title="Dashboard"
            description="Kelola seluruh aktivitas organisasi."
          />

          <DashboardStats />

          <RecentActivities />
        </main>
      </div>
    </div>
  );
}