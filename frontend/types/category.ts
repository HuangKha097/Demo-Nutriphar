import type { Product } from "@/types/product";

export interface Category {
  id: string;
  name: string;
  image?: string;
  products?: Product[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryDto {
  name: string;
  image?: string;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;
