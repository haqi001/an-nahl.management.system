import { Member } from "@/types/member";

import MemberModal from "./MemberModal";
import DeleteMemberModal from "./DeleteMemberModal";

import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";

import { useUserProfile } from "@/components/auth/UserProfileProvider";

import {
  canAccess,
} from "@/services/permission.service";

interface MemberTableProps {
  members: Member[];
}

export default function MemberTable({
  members,
}: MemberTableProps) {
  const {
    profile,
    loading: profileLoading,
  } = useUserProfile();

  const canDelete =
    !profileLoading &&
    profile !== null &&
    canAccess(
      profile.role,
      "members",
      "delete"
    );

  if (members.length === 0) {
    return (
      <EmptyState
        icon="👥"
        title="No Members Found"
        description="Click + Add Member to create your first member."
        action={<MemberModal />}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Name
            </th>

            <th className="px-4 py-3 text-left">
              Division
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              NIM
            </th>

            <th className="px-4 py-3 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {member.name}
              </td>

              <td className="px-4 py-3">
                {member.division}
              </td>

              <td className="px-4 py-3">
                <StatusBadge
                  status={member.status}
                />
              </td>

              <td className="px-4 py-3">
                {member.nim}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <MemberModal
                    mode="edit"
                    member={member}
                  />

                  {canDelete && (
                    <DeleteMemberModal
                      member={member}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}