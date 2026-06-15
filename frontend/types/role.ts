import type { User } from "@/types/user";
import type { Permissions } from "@/lib/permissions";

export interface Role {
  id: string;
  roleName: string;
  permissions: Permissions;
  users?: User[];
}

export interface CreateRoleDto {
  roleName: string;
  permissions?: Permissions;
}

export interface UpdateRoleDto extends Partial<CreateRoleDto> {}
