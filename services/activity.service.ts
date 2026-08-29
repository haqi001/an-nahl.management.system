import { db } from "@/firebase/config";

import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  limit,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { Activity } from "@/types/activity";

export async function createActivity(
  data: Omit<Activity, "id" | "createdAt">
) {
  await addDoc(
    collection(db, "activity_logs"),
    {
      ...data,
      createdAt: serverTimestamp(),
    }
  );
}

export async function getRecentActivities() {
  const activityQuery = query(
    collection(db, "activity_logs"),
    orderBy("createdAt", "desc"),
    limit(5)
  );

  const snapshot =
    await getDocs(activityQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Activity[];
}