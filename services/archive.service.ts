import { db } from "@/firebase/config";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

import { Archive } from "@/types/archive";
import { createActivity } from "@/services/activity.service";

export async function getArchives() {
  const archiveQuery = query(
    collection(db, "archives"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(archiveQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  })) as Archive[];
}

export async function createArchive(
  data: Omit<Archive, "id">
) {
  await addDoc(
    collection(db, "archives"),
    data
  );

  await createActivity({
    module: "Archive",
    action: "Created",
    title: "Archive Created",
    description: `${data.title} ditambahkan.`,
  });
}

export async function deleteArchive(
  id: string
) {
  await deleteDoc(
    doc(db, "archives", id)
  );

  await createActivity({
    module: "Archive",
    action: "Deleted",
    title: "Archive Deleted",
    description: `Archive dengan ID ${id} dihapus.`,
  });
}