import MemberModal from "@/components/members/MemberModal";
import MembersContent from "@/components/members/MembersContent";

import { getMembers } from "@/services/member.service";

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Members
          </h1>

          <p className="text-slate-500">
            Manage An-Nahl members.
          </p>
        </div>

        <MemberModal />
      </div>

      <MembersContent
        members={members}
      />
    </div>
  );
}