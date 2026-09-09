import { UserRole } from "@/types/user";

export type PermissionAction =
  | "view"
  | "create"
  | "update"
  | "delete"
  | "download";

export type PermissionModule =
  | "dashboard"
  | "members"
  | "timeline"
  | "cashflow"
  | "archive"
  | "competitions"
  | "settings";

export const ROLE_PERMISSIONS: Record<
  UserRole,
  Partial<
    Record<
      PermissionModule,
      PermissionAction[]
    >
  >
> = {
  BPH: {
    dashboard: [
      "view",
    ],
    members: [
      "view",
      "create",
      "update",
      "delete",
    ],
    timeline: [
      "view",
      "create",
      "update",
      "delete",
    ],
    cashflow: [
      "view",
      "create",
      "update",
      "delete",
    ],
    archive: [
      "view",
      "create",
      "update",
      "delete",
      "download",
    ],
    competitions: [
      "view",
      "create",
      "update",
      "delete",
    ],
    settings: [
      "view",
      "update",
    ],
  },

  "Ketua Departemen": {
    dashboard: [
      "view",
    ],
    members: [
      "view",
      "update",
    ],
    timeline: [
      "view",
    ],
    cashflow: [
      "view",
    ],
    archive: [
      "view",
      "create",
      "update",
      "delete",
      "download",
    ],
    competitions: [
      "view",
    ],
  },

  Member: {
    dashboard: [
      "view",
    ],
    members: [
      "view",
    ],
    timeline: [
      "view",
    ],
    cashflow: [
      "view",
    ],
    archive: [
      "view",
      "download",
    ],
    competitions: [
      "view",
    ],
  },
};

export function hasPermission(
  role: UserRole,
  module: PermissionModule,
  action: PermissionAction
): boolean {
  return (
    ROLE_PERMISSIONS[role]?.[
      module
    ]?.includes(action) ?? false
  );
}