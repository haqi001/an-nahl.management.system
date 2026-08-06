import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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
  await addDoc(collection(db, "members"), data);
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
  const memberRef = doc(db, "members", id);

  await updateDoc(memberRef, data);
}

export async function deleteMember(id: string) {
  const memberRef = doc(db, "members", id);

  await deleteDoc(memberRef);
}