import { z } from "zod";
import { getLocalStorage, setLocalStorage, DEFAULT_NEWS, USE_MOCK } from "./api";
import { apiClient } from "@/lib/api-client";
import type { News, CreateNewsDto, UpdateNewsDto, PaginatedResponse, PaginationParams } from "@/types";

const INITIAL_NEWS_KEY = "nutriphar_news";

export const newsSchema = z.object({
  title: z.string().trim().min(1, "Tiêu đề là bắt buộc").max(200),
  content: z.string().trim().min(1, "Nội dung là bắt buộc").max(10000),
  image: z.string().trim().optional(),
  authorId: z.string().optional(),
});
export type NewsInput = z.infer<typeof newsSchema>;

export const newsService = {
  async findAll(params?: PaginationParams): Promise<PaginatedResponse<News>> {
    if (!USE_MOCK) {
      return apiClient.get<PaginatedResponse<News>>("/news", params as any);
    }
    const news = getLocalStorage<any[]>(INITIAL_NEWS_KEY, DEFAULT_NEWS as any);
    
    let result = [...news];
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
    }
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const startIndex = (page - 1) * limit;
    const data = result.slice(startIndex, startIndex + limit);
    
    return { data, total, page, limit } as any;
  },

  async findOne(id: string): Promise<News> {
    if (!USE_MOCK) {
      return apiClient.get<News>(`/news/${id}`);
    }
    const news = getLocalStorage<any[]>(INITIAL_NEWS_KEY, DEFAULT_NEWS as any);
    const item = news.find(n => String(n.id) === String(id));
    if (!item) throw new Error("News not found");
    return item as any;
  },

  async create(dto: CreateNewsDto): Promise<News> {
    const validated = newsSchema.parse(dto);
    if (!USE_MOCK) {
      return apiClient.post<News>("/news", validated);
    }
    const news = getLocalStorage<any[]>(INITIAL_NEWS_KEY, DEFAULT_NEWS as any);
    const newId = String(Date.now());
    const newArticle = {
      ...validated,
      id: newId,
      excerpt: validated.content.slice(0, 150) + (validated.content.length > 150 ? "..." : ""),
      image: validated.image || "/images/quytrinhsanxuat.jpg",
      date: new Date().toLocaleDateString("vi-VN"),
      slug: "#",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    news.push(newArticle);
    setLocalStorage(INITIAL_NEWS_KEY, news);
    return newArticle as any;
  },

  async update(id: string, dto: UpdateNewsDto): Promise<News> {
    const validated = newsSchema.partial().parse(dto);
    if (!USE_MOCK) {
      return apiClient.put<News>(`/news/${id}`, validated);
    }
    const news = getLocalStorage<any[]>(INITIAL_NEWS_KEY, DEFAULT_NEWS as any);
    const index = news.findIndex(n => String(n.id) === String(id));
    if (index === -1) throw new Error("News not found");
    
    const updated = {
      ...news[index],
      ...validated,
      excerpt: validated.content ? (validated.content.slice(0, 150) + (validated.content.length > 150 ? "..." : "")) : news[index].excerpt,
      updatedAt: new Date().toISOString()
    };
    news[index] = updated;
    setLocalStorage(INITIAL_NEWS_KEY, news);
    return updated as any;
  },

  async remove(id: string): Promise<void> {
    if (!USE_MOCK) {
      return apiClient.delete<void>(`/news/${id}`);
    }
    const news = getLocalStorage<any[]>(INITIAL_NEWS_KEY, DEFAULT_NEWS as any);
    const filtered = news.filter(n => String(n.id) !== String(id));
    setLocalStorage(INITIAL_NEWS_KEY, filtered);
  }
};
