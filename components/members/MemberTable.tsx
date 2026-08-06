import { Member } from "@/types/member";

import MemberModal from "./MemberModal";
import DeleteMemberModal from "./DeleteMemberModal";

import StatusBadge from "@/components/common/StatusBadge";

interface MemberTableProps {
  members: Member[];
}

export default function MemberTable({
  members,
}: MemberTableProps) {
  if (members.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
        <div className="text-6xl">👥</div>

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          No Members Found
        </h2>

        <p className="mt-2 text-slate-500">
          Click{" "}
          <span className="font-semibold">
            + Add Member
          </span>{" "}
          to create your first member.
        </p>

        <div className="mt-8">
          <MemberModal />
        </div>
      </div>
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

                  <DeleteMemberModal
                    member={member}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}