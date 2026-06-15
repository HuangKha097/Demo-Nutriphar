import { useAuth } from "@/contexts/auth-context";
import { useUsers } from "@/hooks/use-users-query";
import { useRoles } from "@/hooks/use-roles-query";
import { can, Resource, Action } from "@/lib/permissions";

export function usePermissions() {
  const { currentUserId } = useAuth();
  const { data: usersData } = useUsers({ limit: 1000 });
  const { data: rolesData } = useRoles();

  const allUsers = usersData?.data || [];
  const allRoles = rolesData || [];

  return {
    hasPermission: (resource: Resource, action: Action) => {
      // fallback admin account always has all permissions
      if (currentUserId === "user-admin" || currentUserId === "1") return true;

      const user = allUsers.find(u => u.id === currentUserId);
      const role = allRoles.find(r => r.id === user?.roleId);

      if (!user || !role) return false;
      return can(role, resource, action);
    }
  };
}
