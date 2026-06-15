import { getLocalStorage, setLocalStorage, DEFAULT_CATEGORIES } from "./api";
import type { Category, CreateCategoryDto, UpdateCategoryDto, PaginatedResponse, PaginationParams } from "@/types";

const INITIAL_CATEGORIES_KEY = "nutriphar_categories";

export const categoryService = {
  async findAll(params?: PaginationParams): Promise<PaginatedResponse<Category>> {
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
    return getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);
  },

  async findOne(id: string): Promise<Category> {
    const categories = getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);
    const category = categories.find(c => c.id === id);
    if (!category) throw new Error("Category not found");
    return category;
  },

  async create(dto: CreateCategoryDto): Promise<Category> {
    const categories = getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);
    const newCategory: Category = {
      id: "cat-" + Date.now(),
      name: dto.name,
      image: dto.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    categories.push(newCategory);
    setLocalStorage(INITIAL_CATEGORIES_KEY, categories);
    return newCategory;
  },

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const categories = getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Category not found");
    
    const updated = {
      ...categories[index],
      ...dto,
      updatedAt: new Date().toISOString()
    };
    categories[index] = updated;
    setLocalStorage(INITIAL_CATEGORIES_KEY, categories);
    return updated;
  },

  async remove(id: string): Promise<void> {
    const categories = getLocalStorage<Category[]>(INITIAL_CATEGORIES_KEY, DEFAULT_CATEGORIES);
    const filtered = categories.filter(c => c.id !== id);
    setLocalStorage(INITIAL_CATEGORIES_KEY, filtered);
  }
};
