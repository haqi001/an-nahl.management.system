export interface Competition {
  id: string;
  title: string;
  organizer: string;
  deadline: string;
  category: string;
  status: "Active" | "Closed";
  description: string;
}