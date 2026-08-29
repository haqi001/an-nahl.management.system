import { db } from "@/firebase/config";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { Competition } from "@/types/competition";

import { createActivity } from "@/services/activity.service";

export async function getCompetitions() {
  const snapshot = await getDocs(
    collection(db, "competitions")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Competition[];
}

export async function createCompetition(
  data: Omit<Competition, "id">
) {
  await addDoc(
    collection(db, "competitions"),
    data
  );

  await createActivity({
    module: "Competition",
    action: "Created",
    title: "Competition Created",
    description: `${data.title} ditambahkan.`,
  });
}

export async function updateCompetition(
  id: string,
  data: Omit<Competition, "id">
) {
  const competitionRef = doc(
    db,
    "competitions",
    id
  );

  const competitionSnapshot =
    await getDoc(competitionRef);

  if (!competitionSnapshot.exists()) {
    throw new Error(
      "Competition not found."
    );
  }

  const oldData =
    competitionSnapshot.data() as Omit<
      Competition,
      "id"
    >;

  await updateDoc(
    competitionRef,
    data
  );

  const changes: string[] = [];

  if (oldData.title !== data.title) {
    changes.push(
      `Title diubah menjadi "${data.title}".`
    );
  }

  if (
    oldData.organizer !==
    data.organizer
  ) {
    changes.push(
      `Organizer diubah menjadi "${data.organizer}".`
    );
  }

  if (
    oldData.deadline !==
    data.deadline
  ) {
    changes.push(
      `Deadline diubah menjadi "${data.deadline}".`
    );
  }

  if (
    oldData.category !==
    data.category
  ) {
    changes.push(
      `Category diubah menjadi "${data.category}".`
    );
  }

  if (oldData.status !== data.status) {
    changes.push(
      `Status diubah menjadi "${data.status}".`
    );
  }

  if (
    oldData.description !==
    data.description
  ) {
    changes.push(
      "Description diperbarui."
    );
  }

  await createActivity({
    module: "Competition",
    action: "Updated",
    title: "Competition Updated",
    description:
      changes.length > 0
        ? changes.join(" ")
        : `${data.title} diperbarui.`,
  });
}

export async function deleteCompetition(
  id: string
) {
  await deleteDoc(
    doc(db, "competitions", id)
  );

  await createActivity({
    module: "Competition",
    action: "Deleted",
    title: "Competition Deleted",
    description: `Competition dengan ID ${id} dihapus.`,
  });
}