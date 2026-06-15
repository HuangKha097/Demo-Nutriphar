import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roleService } from "@/services/role.service";
import type { Role, CreateRoleDto, UpdateRoleDto, PaginationParams } from "@/types";
import { queryKeys } from "@/lib/query-keys";

export function useRoles() {
  return useQuery({
    queryKey: queryKeys.roles.all,
    queryFn: () => roleService.findAll(),
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateRoleDto) => roleService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.all });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateRoleDto }) =>
      roleService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.all });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => roleService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.all });
    },
  });
}
