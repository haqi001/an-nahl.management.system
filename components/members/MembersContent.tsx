"use client";

import { useMemo, useState } from "react";

import { Member } from "@/types/member";

import SearchInput from "@/components/common/SearchInput";
import MemberTable from "./MemberTable";
import MemberStats from "./MemberStats";

interface MembersContentProps {
  members: Member[];
}

export default function MembersContent({
  members,
}: MembersContentProps) {
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return members;
    }

    return members.filter((member) => {
      return (
        member.name.toLowerCase().includes(keyword) ||
        member.nim.toLowerCase().includes(keyword) ||
        member.division.toLowerCase().includes(keyword)
      );
    });
  }, [members, search]);

  return (
    <div className="space-y-6">
      <MemberStats
        members={members}
      />

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search by name, NIM, or division..."
      />

      {filteredMembers.length > 0 ? (
        <MemberTable
          members={filteredMembers}
        />
      ) : (
        <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
          <div className="text-6xl">🔍</div>

          <h2 className="mt-6 text-2xl font-bold text-slate-800">
            No Matching Members Found
          </h2>

          <p className="mt-2 text-slate-500">
            Try searching with another name,
            NIM, or division.
          </p>
        </div>
      )}
    </div>
  );
}