export type Resource = "products" | "categories" | "users" | "roles" | "news";
export type Action = "view" | "create" | "edit" | "delete";

export type Permissions = Record<string, Record<string, boolean>>;

const RESOURCES: Resource[] = ["products", "categories", "users", "roles", "news"];
const ACTIONS: Action[] = ["view", "create", "edit", "delete"];

export function emptyPermissions(): Permissions {
  const p: Permissions = {};
  for (const r of RESOURCES) {
    p[r] = {};
    for (const a of ACTIONS) {
      p[r][a] = false;
    }
  }
  return p;
}

export function can(userRole: any, resource: Resource, action: Action): boolean {
  if (!userRole || !userRole.permissions) return false;
  return !!userRole.permissions[resource]?.[action];
}
