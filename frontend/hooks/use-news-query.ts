import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { newsService } from "@/services/news.service";
import { queryKeys } from "@/lib/query-keys";
import type { PaginationParams, CreateNewsDto, UpdateNewsDto } from "@/types";

export function useNews(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.news.list(params),
    queryFn: () => newsService.findAll(params),
    placeholderData: keepPreviousData,
  });
}

export function useNewsArticle(id: string) {
  return useQuery({
    queryKey: queryKeys.news.detail(id),
    queryFn: () => newsService.findOne(id),
    enabled: !!id,
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateNewsDto) => newsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.news.all });
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateNewsDto }) => newsService.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.news.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.news.detail(variables.id) });
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => newsService.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.news.all });
      queryClient.removeQueries({ queryKey: queryKeys.news.detail(id) });
    },
  });
}
