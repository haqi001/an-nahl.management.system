export type UserRole =
  | "BPH"
  | "Ketua Departemen"
  | "Member";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  division: string | null;
}