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

export async function getMembers() {
  const snapshot = await getDocs(
    collection(db, "members")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function createMember(data: {
  name: string;
  nim: string;
  division: string;
  status: string;
}) {
  await addDoc(
    collection(db, "members"),
    data
  );

  await createActivity({
    module: "Member",
    action: "Created",
    title: "Member Created",
    description: `${data.name} ditambahkan sebagai member.`,
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
  const memberRef = doc(
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
    description: `${data.name} diperbarui.`,
  });
}

export async function deleteMember(
  id: string
) {
  const memberRef = doc(
    db,
    "members",
    id
  );

  await deleteDoc(memberRef);

  await createActivity({
    module: "Member",
    action: "Deleted",
    title: "Member Deleted",
    description: `Member dengan ID ${id} dihapus.`,
  });
}