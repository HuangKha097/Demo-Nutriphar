import { z } from "zod";
import { getLocalStorage, setLocalStorage, USE_MOCK } from "./api";
import { apiClient } from "@/lib/api-client";
import type { Role, CreateRoleDto, UpdateRoleDto } from "@/types";
import { emptyPermissions } from "@/lib/permissions";

const INITIAL_ROLES_KEY = "nutriphar_roles";

const adminPermissions = () => {
  const p = emptyPermissions();
  for (const r of Object.keys(p)) {
    for (const a of Object.keys(p[r])) {
      p[r][a] = true;
    }
  }
  return p;
};

const staffPermissions = () => {
  const p = emptyPermissions();
  for (const r of Object.keys(p)) {
    p[r]["view"] = true;
  }
  return p;
};

export const DEFAULT_ROLES: Role[] = [
  {
    id: "role-admin",
    roleName: "Administrator",
    permissions: adminPermissions()
  },
  {
    id: "role-manager",
    roleName: "Manager",
    permissions: (() => {
      const p = adminPermissions();
      p["users"]["delete"] = false;
      p["roles"]["delete"] = false;
      p["roles"]["create"] = false;
      p["roles"]["edit"] = false;
      return p;
    })()
  },
  {
    id: "role-staff",
    roleName: "Staff",
    permissions: staffPermissions()
  }
];

export const roleCreateSchema = z.object({
  roleName: z.string().min(2, "Tên vai trò phải có tối thiểu 2 ký tự"),
  description: z.string().optional(),
  permissions: z.record(z.string(), z.record(z.string(), z.boolean())).optional(),
});

export const roleEditSchema = roleCreateSchema;

export type RoleCreateInput = z.infer<typeof roleCreateSchema>;
export type RoleEditInput = z.infer<typeof roleEditSchema>;

export const roleService = {
  async findAll(): Promise<Role[]> {
    if (!USE_MOCK) {
      return apiClient.get<Role[]>("/roles");
    }
    return getLocalStorage<Role[]>(INITIAL_ROLES_KEY, DEFAULT_ROLES);
  },

  async findOne(id: string): Promise<Role> {
    if (!USE_MOCK) {
      return apiClient.get<Role>(`/roles/${id}`);
    }
    const roles = getLocalStorage<Role[]>(INITIAL_ROLES_KEY, DEFAULT_ROLES);
    const role = roles.find(r => r.id === id);
    if (!role) throw new Error("Role not found");
    return role;
  },

  async create(dto: CreateRoleDto): Promise<Role> {
    const validated = roleCreateSchema.parse(dto);
    if (!USE_MOCK) {
      return apiClient.post<Role>("/roles", validated);
    }
    const roles = getLocalStorage<Role[]>(INITIAL_ROLES_KEY, DEFAULT_ROLES);
    const newRole: Role = {
      id: "role-" + Date.now(),
      roleName: validated.roleName,
      permissions: (validated.permissions as any) || emptyPermissions()
    };
    roles.push(newRole);
    setLocalStorage(INITIAL_ROLES_KEY, roles);
    return newRole;
  },

  async update(id: string, dto: UpdateRoleDto): Promise<Role> {
    const validated = roleEditSchema.partial().parse(dto);
    if (!USE_MOCK) {
      return apiClient.put<Role>(`/roles/${id}`, validated);
    }
    const roles = getLocalStorage<Role[]>(INITIAL_ROLES_KEY, DEFAULT_ROLES);
    const index = roles.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Role not found");
    
    const updated = {
      ...roles[index],
      roleName: validated.roleName !== undefined ? validated.roleName : roles[index].roleName,
      permissions: (validated.permissions !== undefined ? validated.permissions : roles[index].permissions) as any
    };
    roles[index] = updated;
    setLocalStorage(INITIAL_ROLES_KEY, roles);
    return updated;
  },

  async remove(id: string): Promise<void> {
    if (!USE_MOCK) {
      return apiClient.delete<void>(`/roles/${id}`);
    }
    const roles = getLocalStorage<Role[]>(INITIAL_ROLES_KEY, DEFAULT_ROLES);
    const filtered = roles.filter(r => r.id !== id);
    setLocalStorage(INITIAL_ROLES_KEY, filtered);
  }
};
