import { db } from "@/firebase/config";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import {
  CashFlow,
} from "@/types/cash-flow";

import {
  createActivity,
} from "@/services/activity.service";

export async function getCashFlows() {
  const cashFlowQuery = query(
    collection(db, "cash_flows"),
    orderBy("date", "desc")
  );

  const snapshot =
    await getDocs(cashFlowQuery);

  return snapshot.docs.map(
    (document) => ({
      id: document.id,
      ...document.data(),
    })
  ) as CashFlow[];
}

export async function createCashFlow(
  data: Omit<CashFlow, "id">
) {
  const document =
    await addDoc(
      collection(db, "cash_flows"),
      data
    );

  await createActivity({
    module: "Cash Flow",
    action: "Created",
    title: "Cash Flow Created",
    description:
      `${data.type}: ${data.description}`,
  });

  return document.id;
}

export async function updateCashFlow(
  id: string,
  data: Omit<CashFlow, "id">
) {
  await updateDoc(
    doc(db, "cash_flows", id),
    data
  );

  await createActivity({
    module: "Cash Flow",
    action: "Updated",
    title: "Cash Flow Updated",
    description:
      `${data.type}: ${data.description}`,
  });
}

export async function deleteCashFlow(
  id: string
) {
  await deleteDoc(
    doc(db, "cash_flows", id)
  );

  await createActivity({
    module: "Cash Flow",
    action: "Deleted",
    title: "Cash Flow Deleted",
    description:
      `Cash Flow dengan ID ${id} dihapus.`,
  });
}