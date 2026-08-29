export type ArchiveCategory =
  | "Correspondence"
  | "Document"
  | "Asset"
  | "Other";

export interface Archive {
  id: string;
  title: string;
  category: ArchiveCategory;
  description: string;
  fileName: string;
  fileUrl: string;
  storagePath: string;
  createdAt: string;
}