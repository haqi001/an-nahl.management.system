import { db } from "@/firebase/config";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { Timeline } from "@/types/timeline";

import { createActivity } from "@/services/activity.service";

export async function getTimeline() {
  const snapshot = await getDocs(
    collection(db, "timeline")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Timeline[];
}

export async function createTimeline(
  data: Omit<Timeline, "id">
) {
  await addDoc(
    collection(db, "timeline"),
    data
  );

  await createActivity({
    module: "Timeline",
    action: "Created",
    title: "Timeline Created",
    description: `${data.title} dibuat.`,
  });
}

export async function updateTimeline(
  id: string,
  data: Omit<Timeline, "id">
) {
  await updateDoc(
    doc(db, "timeline", id),
    data
  );

  await createActivity({
    module: "Timeline",
    action: "Updated",
    title: "Timeline Updated",
    description: `${data.title} diperbarui.`,
  });
}

export async function deleteTimeline(
  id: string
) {
  await deleteDoc(
    doc(db, "timeline", id)
  );

  await createActivity({
    module: "Timeline",
    action: "Deleted",
    title: "Timeline Deleted",
    description: `Timeline dengan ID ${id} dihapus.`,
  });
}