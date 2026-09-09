import {
  hasPermission,
  PermissionAction,
  PermissionModule,
} from "@/types/permission";

import { UserRole } from "@/types/user";

export function canAccess(
  role: UserRole | null,
  module: PermissionModule,
  action: PermissionAction
): boolean {
  if (!role) {
    return false;
  }

  return hasPermission(
    role,
    module,
    action
  );
}