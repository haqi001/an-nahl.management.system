export type CashFlowType =
  | "Income"
  | "Expense";

export type CashFlowCategory =
  | "Membership"
  | "Fundraising"
  | "Sponsorship"
  | "Event"
  | "Donation"
  | "Operational"
  | "Equipment"
  | "Transportation"
  | "Consumption"
  | "Publication"
  | "Administration"
  | "Other";

export interface CashFlow {
  id: string;
  date: string;
  type: CashFlowType;
  category: CashFlowCategory;
  description: string;
  amount: number;
  createdAt: string;
}