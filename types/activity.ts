import { Timestamp } from "firebase/firestore";

export type ActivityModule =
  | "Member"
  | "Timeline"
  | "CashFlow"
  | "Competition"
  | "Archive";

export type ActivityAction =
  | "Created"
  | "Updated"
  | "Deleted";

export interface Activity {
  id: string;
  module: ActivityModule;
  action: ActivityAction;
  title: string;
  description: string;
  createdAt: Timestamp;
}