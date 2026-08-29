export interface Timeline {
  id: string;
  title: string;
  department: string;
  date: string;
  location: string;
  status: "Upcoming" | "Completed";
}