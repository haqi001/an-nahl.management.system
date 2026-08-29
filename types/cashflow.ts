export type CashFlowCategory =
  | "Income"
  | "Expense"
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
  title: string;
  category: CashFlowCategory;
  amount: number;
  date: string;
  description: string;
}