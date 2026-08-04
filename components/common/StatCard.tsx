import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">

          <div>
            <p className="text-sm text-slate-500">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {value}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          </div>

          <div className="rounded-xl bg-emerald-100 p-3">
            <Icon className="h-6 w-6 text-emerald-600" />
          </div>

        </div>
      </CardContent>
    </Card>
  );
}