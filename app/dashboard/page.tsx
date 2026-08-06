import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Selamat datang di An-Nahl Management System.
        </p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>

        <QuickActions />
      </div>
    </div>
  );
}