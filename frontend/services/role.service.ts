import { getLocalStorage, setLocalStorage } from "./api";
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

export const roleService = {
  async findAll(): Promise<Role[]> {
    return getLocalStorage<Role[]>(INITIAL_ROLES_KEY, DEFAULT_ROLES);
  },

  async findOne(id: string): Promise<Role> {
    const roles = getLocalStorage<Role[]>(INITIAL_ROLES_KEY, DEFAULT_ROLES);
    const role = roles.find(r => r.id === id);
    if (!role) throw new Error("Role not found");
    return role;
  },

  async create(dto: CreateRoleDto): Promise<Role> {
    const roles = getLocalStorage<Role[]>(INITIAL_ROLES_KEY, DEFAULT_ROLES);
    const newRole: Role = {
      id: "role-" + Date.now(),
      roleName: dto.roleName,
      permissions: dto.permissions || emptyPermissions()
    };
    roles.push(newRole);
    setLocalStorage(INITIAL_ROLES_KEY, roles);
    return newRole;
  },

  async update(id: string, dto: UpdateRoleDto): Promise<Role> {
    const roles = getLocalStorage<Role[]>(INITIAL_ROLES_KEY, DEFAULT_ROLES);
    const index = roles.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Role not found");
    
    const updated = {
      ...roles[index],
      roleName: dto.roleName !== undefined ? dto.roleName : roles[index].roleName,
      permissions: dto.permissions !== undefined ? dto.permissions : roles[index].permissions
    };
    roles[index] = updated;
    setLocalStorage(INITIAL_ROLES_KEY, roles);
    return updated;
  },

  async remove(id: string): Promise<void> {
    const roles = getLocalStorage<Role[]>(INITIAL_ROLES_KEY, DEFAULT_ROLES);
    const filtered = roles.filter(r => r.id !== id);
    setLocalStorage(INITIAL_ROLES_KEY, filtered);
  }
};
