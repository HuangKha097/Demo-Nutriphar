import { z } from "zod";
import { getLocalStorage, setLocalStorage, DEFAULT_CATEGORIES, USE_MOCK } from "./api";
import { apiClient } from "@/lib/api-client";
import type { Category, CreateCategoryDto, UpdateCategoryDto, PaginatedResponse, PaginationParams } from "@/types";

const INITIAL_CATEGORIES_KEY = "nutriphar_categories";

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Tên danh mục là bắt buộc").max(80),
  image: z.string().trim().optional(),
});
export type CategoryInput = z.infer<typeof categorySchema>;

export const categoryService = {
  async findAll(params?: PaginationParams): Promise<PaginatedResponse<Category>> {
    if (!USE_MOCK) {
      return apiClient.get<PaginatedResponse<Category>>("/categories", params as any);
    }
    const categories = getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);

    let result = [...categories];
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q));
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const startIndex = (page - 1) * limit;
    const data = result.slice(startIndex, startIndex + limit);

    return { data, total, page, limit };
  },

  async findAllSimple(): Promise<Category[]> {
    if (!USE_MOCK) {
      return apiClient.get<Category[]>("/categories/all");
    }
    return getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);
  },

  async findOne(id: string): Promise<Category> {
    if (!USE_MOCK) {
      return apiClient.get<Category>(`/categories/${id}`);
    }
    const categories = getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);
    const category = categories.find(c => c.id === id);
    if (!category) throw new Error("Category not found");
    return category;
  },

  async create(dto: CreateCategoryDto): Promise<Category> {
    const validated = categorySchema.parse(dto);
    if (!USE_MOCK) {
      return apiClient.post<Category>("/categories", validated);
    }
    const categories = getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);
    const newCategory: Category = {
      id: "cat-" + Date.now(),
      name: validated.name,
      image: validated.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    categories.push(newCategory);
    setLocalStorage(INITIAL_CATEGORIES_KEY, categories);
    return newCategory;
  },

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const validated = categorySchema.partial().parse(dto);
    if (!USE_MOCK) {
      return apiClient.put<Category>(`/categories/${id}`, validated);
    }
    const categories = getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Category not found");

    const updated = {
      ...categories[index],
      ...validated,
      updatedAt: new Date().toISOString()
    };
    categories[index] = updated;
    setLocalStorage(INITIAL_CATEGORIES_KEY, categories);
    return updated;
  },

  async remove(id: string): Promise<void> {
    if (!USE_MOCK) {
      return apiClient.delete<void>(`/categories/${id}`);
    }
    const categories = getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);
    const filtered = categories.filter(c => c.id !== id);
    setLocalStorage(INITIAL_CATEGORIES_KEY, filtered);
  }
};
