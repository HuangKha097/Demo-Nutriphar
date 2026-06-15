import { getLocalStorage, setLocalStorage, DEFAULT_NEWS } from "./api";
import type { News, CreateNewsDto, UpdateNewsDto, PaginatedResponse, PaginationParams } from "@/types";

const INITIAL_NEWS_KEY = "nutriphar_news";

export const newsService = {
  async findAll(params?: PaginationParams): Promise<PaginatedResponse<News>> {
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
    const news = getLocalStorage<any[]>(INITIAL_NEWS_KEY, DEFAULT_NEWS as any);
    const item = news.find(n => String(n.id) === String(id));
    if (!item) throw new Error("News not found");
    return item as any;
  },

  async create(dto: CreateNewsDto): Promise<News> {
    const news = getLocalStorage<any[]>(INITIAL_NEWS_KEY, DEFAULT_NEWS as any);
    const newId = String(Date.now());
    const newArticle = {
      ...dto,
      id: newId,
      excerpt: dto.content.slice(0, 150) + (dto.content.length > 150 ? "..." : ""),
      image: "/images/quytrinhsanxuat.jpg",
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
    const news = getLocalStorage<any[]>(INITIAL_NEWS_KEY, DEFAULT_NEWS as any);
    const index = news.findIndex(n => String(n.id) === String(id));
    if (index === -1) throw new Error("News not found");
    
    const updated = {
      ...news[index],
      ...dto,
      excerpt: dto.content ? (dto.content.slice(0, 150) + (dto.content.length > 150 ? "..." : "")) : news[index].excerpt,
      updatedAt: new Date().toISOString()
    };
    news[index] = updated;
    setLocalStorage(INITIAL_NEWS_KEY, news);
    return updated as any;
  },

  async remove(id: string): Promise<void> {
    const news = getLocalStorage<any[]>(INITIAL_NEWS_KEY, DEFAULT_NEWS as any);
    const filtered = news.filter(n => String(n.id) !== String(id));
    setLocalStorage(INITIAL_NEWS_KEY, filtered);
  }
};
