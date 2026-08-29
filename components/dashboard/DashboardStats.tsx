import StatCard from "@/components/common/StatCard";

import {
  Users,
  Wallet,
  CalendarDays,
  Trophy,
} from "lucide-react";

import { getMembers } from "@/services/member.service";
import { getTimeline } from "@/services/timeline.service";
import { getCashFlows } from "@/services/cashflow.service";
import { getCompetitions } from "@/services/competition.service";

export default async function DashboardStats() {
  const [
    members,
    timelines,
    cashFlows,
    competitions,
  ] = await Promise.all([
    getMembers(),
    getTimeline(),
    getCashFlows(),
    getCompetitions(),
  ]);

  const totalMembers =
    members.filter(
      (member) =>
        member.status === "Active"
    ).length;

  const upcomingEvents =
    timelines.filter(
      (timeline) =>
        timeline.status === "Upcoming"
    ).length;

  const activeCompetitions =
    competitions.filter(
      (competition) =>
        competition.status === "Active"
    ).length;

  const totalIncome =
    cashFlows
      .filter(
        (cashFlow) =>
          cashFlow.category === "Income"
      )
      .reduce(
        (total, cashFlow) =>
          total + cashFlow.amount,
        0
      );

  const totalExpense =
    cashFlows
      .filter(
        (cashFlow) =>
          cashFlow.category === "Expense"
      )
      .reduce(
        (total, cashFlow) =>
          total + cashFlow.amount,
        0
      );

  const balance =
    totalIncome - totalExpense;

  function formatCurrency(
    amount: number
  ) {
    return new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }
    ).format(amount);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Members"
        value={totalMembers.toString()}
        description="Active members"
        icon={Users}
        iconBackground="bg-emerald-100"
        iconColor="text-emerald-600"
      />

      <StatCard
        title="Cash Flow"
        value={formatCurrency(balance)}
        description="Current balance"
        icon={Wallet}
        iconBackground="bg-amber-100"
        iconColor="text-amber-600"
      />

      <StatCard
        title="Upcoming Events"
        value={upcomingEvents.toString()}
        description="Upcoming events"
        icon={CalendarDays}
        iconBackground="bg-blue-100"
        iconColor="text-blue-600"
      />

      <StatCard
        title="Competitions"
        value={activeCompetitions.toString()}
        description="Active competitions"
        icon={Trophy}
        iconBackground="bg-violet-100"
        iconColor="text-violet-600"
      />
    </div>
  );
}