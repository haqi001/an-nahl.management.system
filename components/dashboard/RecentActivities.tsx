import {
  CalendarDays,
  UserPlus,
  Wallet,
  Trophy,
} from "lucide-react";

import { getRecentActivities } from "@/services/activity.service";

function getActivityIcon(module: string) {
  if (module === "Timeline") {
    return CalendarDays;
  }

  if (module === "Member") {
    return UserPlus;
  }

  if (module === "Competition") {
    return Trophy;
  }

  return Wallet;
}

function getActivityStyle(module: string) {
  if (module === "Timeline") {
    return {
      background: "bg-blue-100",
      color: "text-blue-600",
    };
  }

  if (module === "Member") {
    return {
      background: "bg-emerald-100",
      color: "text-emerald-600",
    };
  }

  if (module === "Competition") {
    return {
      background: "bg-violet-100",
      color: "text-violet-600",
    };
  }

  return {
    background: "bg-amber-100",
    color: "text-amber-600",
  };
}

function formatActivityTime(
  createdAt: {
    seconds: number;
    nanoseconds: number;
  } | null
) {
  if (!createdAt) {
    return "Baru saja";
  }

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(
    new Date(
      createdAt.seconds * 1000
    )
  );
}

export default async function RecentActivities() {
  const activities =
    await getRecentActivities();

  return (
    <div>
      <div>
        <h2 className="text-lg font-bold text-slate-800">
          Recent Activities
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Aktivitas terbaru dalam sistem.
        </p>
      </div>

      {activities.length === 0 ? (
        <p className="text-sm text-slate-500">
          No recent activities found.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon =
              getActivityIcon(
                activity.module
              );

            const style =
              getActivityStyle(
                activity.module
              );

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 border-b pb-4 last:border-none last:pb-0"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${style.background}`}
                >
                  <Icon
                    className={`h-5 w-5 ${style.color}`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {activity.title}
                    </p>

                    <span className="shrink-0 text-xs font-medium text-slate-400">
                      {activity.action}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-600">
                    {activity.description}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatActivityTime(
                      activity.createdAt
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}