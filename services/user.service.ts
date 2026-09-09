import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import {
  UserProfile,
  UserRole,
} from "@/types/user";

export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  if (!uid) {
    return null;
  }

  const userRef = doc(
    db,
    "users",
    uid
  );

  const snapshot = await getDoc(
    userRef
  );

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    uid: snapshot.id,
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    role: data.role as UserRole,
    division:
      typeof data.division === "string"
        ? data.division
        : null,
  };
}