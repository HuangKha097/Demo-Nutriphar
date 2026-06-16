import { z } from "zod";
import { getLocalStorage, setLocalStorage, INITIAL_PRODUCTS, USE_MOCK } from "./api";
import { apiClient } from "@/lib/api-client";
import type { Product, CreateProductDto, UpdateProductDto, PaginatedResponse, PaginationParams } from "@/types";

const INITIAL_PRODUCTS_KEY = "nutriphar_products";

export const productSchema = z.object({
  name: z.string().trim().min(1, "Tên là bắt buộc").max(120),
  description: z.string().trim().max(2000),
  price: z.coerce
    .number({ message: "Giá tiền phải là một số" })
    .min(0, "Giá tiền không thể âm")
    .max(1_000_000_000, "Giá tiền quá lớn"),
  categoryId: z.string().nullable(),
  image: z.string().trim().optional(),
});
export type ProductInput = z.infer<typeof productSchema>;

export const productService = {
  async findAll(params?: PaginationParams): Promise<PaginatedResponse<Product>> {
    if (!USE_MOCK) {
      return apiClient.get<PaginatedResponse<Product>>("/products", params as any);
    }
    const products = getLocalStorage<any[]>(INITIAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
    
    let result = [...products];
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const startIndex = (page - 1) * limit;
    const data = result.slice(startIndex, startIndex + limit);
    
    return { data, total, page, limit };
  },

  async findOne(id: string): Promise<Product> {
    if (!USE_MOCK) {
      return apiClient.get<Product>(`/products/${id}`);
    }
    const products = getLocalStorage<any[]>(INITIAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
    const product = products.find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  async create(dto: CreateProductDto): Promise<Product> {
    const validated = productSchema.parse(dto);
    if (!USE_MOCK) {
      return apiClient.post<Product>("/products", validated);
    }
    const products = getLocalStorage<any[]>(INITIAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
    const newProduct = {
      ...validated,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const priceVal = Number(validated.price);
    const priceStr = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceVal).replace(/\s/g, '');
    (newProduct as any).priceVal = priceVal;
    (newProduct as any).price = priceStr;
    
    products.push(newProduct);
    setLocalStorage(INITIAL_PRODUCTS_KEY, products);
    return newProduct as any;
  },

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const validated = productSchema.partial().parse(dto);
    if (!USE_MOCK) {
      return apiClient.put<Product>(`/products/${id}`, validated);
    }
    const products = getLocalStorage<any[]>(INITIAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");
    
    const updated = {
      ...products[index],
      ...validated,
      updatedAt: new Date().toISOString()
    };
    
    if (validated.price !== undefined) {
      const priceVal = Number(validated.price);
      const priceStr = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceVal).replace(/\s/g, '');
      (updated as any).priceVal = priceVal;
      (updated as any).price = priceStr;
    }
    
    products[index] = updated;
    setLocalStorage(INITIAL_PRODUCTS_KEY, products);
    return updated as any;
  },

  async remove(id: string): Promise<void> {
    if (!USE_MOCK) {
      return apiClient.delete<void>(`/products/${id}`);
    }
    const products = getLocalStorage<any[]>(INITIAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
    const filtered = products.filter(p => p.id !== id);
    setLocalStorage(INITIAL_PRODUCTS_KEY, filtered);
  }
};
