import { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
      <div className="flex justify-center text-6xl">
        {icon}
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}
    </div>
  );
}