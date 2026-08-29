import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconBackground?: string;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBackground = "bg-emerald-100",
  iconColor = "text-emerald-600",
}: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBackground}`}
          >
            <Icon
              className={`h-7 w-7 ${iconColor}`}
            />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}