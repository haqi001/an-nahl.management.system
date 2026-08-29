import { db } from "@/firebase/config";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { createActivity } from "@/services/activity.service";

import { Member } from "@/types/member";

export async function getMembers(): Promise<
  Member[]
> {
  const snapshot =
    await getDocs(
      collection(db, "members")
    );

  return snapshot.docs.map(
    (document) => {
      const data =
        document.data();

      return {
        id: document.id,
        name:
          typeof data.name ===
          "string"
            ? data.name
            : "",
        nim:
          typeof data.nim ===
          "string"
            ? data.nim
            : "",
        division:
          typeof data.division ===
          "string"
            ? data.division
            : "",
        status:
          data.status ===
          "Inactive"
            ? "Inactive"
            : "Active",
      };
    }
  );
}

export async function createMember(
  data: {
    name: string;
    nim: string;
    division: string;
    status: string;
  }
) {
  await addDoc(
    collection(db, "members"),
    data
  );

  await createActivity({
    module: "Member",
    action: "Created",
    title: "Member Created",
    description:
      `${data.name} ditambahkan sebagai member.`,
  });
}

export async function updateMember(
  id: string,
  data: {
    name: string;
    nim: string;
    division: string;
    status: string;
  }
) {
  const memberRef =
    doc(
      db,
      "members",
      id
    );

  await updateDoc(
    memberRef,
    data
  );

  await createActivity({
    module: "Member",
    action: "Updated",
    title: "Member Updated",
    description:
      `${data.name} diperbarui.`,
  });
}

export async function deleteMember(
  id: string
) {
  const memberRef =
    doc(
      db,
      "members",
      id
    );

  await deleteDoc(
    memberRef
  );

  await createActivity({
    module: "Member",
    action: "Deleted",
    title: "Member Deleted",
    description:
      `Member dengan ID ${id} dihapus.`,
  });
}