import AppNavbar from "./AppNavbar";
import AppSidebar from "./AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <AppNavbar />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}