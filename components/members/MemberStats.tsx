import { Users, UserCheck, UserX } from "lucide-react";

import StatCard from "@/components/common/StatCard";
import { Member } from "@/types/member";

interface MemberStatsProps {
  members: Member[];
}

export default function MemberStats({
  members,
}: MemberStatsProps) {
  const totalMembers = members.length;

  const activeMembers = members.filter(
    (member) => member.status === "Active"
  ).length;

  const inactiveMembers = members.filter(
    (member) => member.status === "Inactive"
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatCard
        title="Total Members"
        value={totalMembers}
        description="All registered members"
        icon={Users}
      />

      <StatCard
        title="Active Members"
        value={activeMembers}
        description="Currently active"
        icon={UserCheck}
      />

      <StatCard
        title="Inactive Members"
        value={inactiveMembers}
        description="Currently inactive"
        icon={UserX}
      />
    </div>
  );
}