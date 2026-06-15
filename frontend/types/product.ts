import type { Category } from "@/types/category";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceVal?: number;
  image?: string;
  categoryId: string | null;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  categoryId: string | null;
  image?: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;
