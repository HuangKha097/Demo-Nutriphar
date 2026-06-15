import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import { queryKeys } from "@/lib/query-keys";
import type { PaginationParams, CreateCategoryDto, UpdateCategoryDto } from "@/types";

export function useCategories(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.categories.list(params),
    queryFn: () => categoryService.findAll(params),
    placeholderData: keepPreviousData,
  });
}

export function useCategoryOptions() {
  return useQuery({
    queryKey: queryKeys.categories.simple(),
    queryFn: () => categoryService.findAllSimple(),
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => categoryService.findOne(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCategoryDto) => categoryService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCategoryDto }) => categoryService.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.detail(variables.id) });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryService.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      queryClient.removeQueries({ queryKey: queryKeys.categories.detail(id) });
    },
  });
}
