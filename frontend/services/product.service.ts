import { getLocalStorage, setLocalStorage, INITIAL_PRODUCTS } from "./api";
import type { Product, CreateProductDto, UpdateProductDto, PaginatedResponse, PaginationParams } from "@/types";

const INITIAL_PRODUCTS_KEY = "nutriphar_products";

export const productService = {
  async findAll(params?: PaginationParams): Promise<PaginatedResponse<Product>> {
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
    const products = getLocalStorage<any[]>(INITIAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
    const product = products.find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  async create(dto: CreateProductDto): Promise<Product> {
    const products = getLocalStorage<any[]>(INITIAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
    const newProduct = {
      ...dto,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const priceVal = Number(dto.price);
    const priceStr = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceVal).replace(/\s/g, '');
    (newProduct as any).priceVal = priceVal;
    (newProduct as any).price = priceStr;
    
    products.push(newProduct);
    setLocalStorage(INITIAL_PRODUCTS_KEY, products);
    return newProduct as any;
  },

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const products = getLocalStorage<any[]>(INITIAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");
    
    const updated = {
      ...products[index],
      ...dto,
      updatedAt: new Date().toISOString()
    };
    
    if (dto.price !== undefined) {
      const priceVal = Number(dto.price);
      const priceStr = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceVal).replace(/\s/g, '');
      (updated as any).priceVal = priceVal;
      (updated as any).price = priceStr;
    }
    
    products[index] = updated;
    setLocalStorage(INITIAL_PRODUCTS_KEY, products);
    return updated as any;
  },

  async remove(id: string): Promise<void> {
    const products = getLocalStorage<any[]>(INITIAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
    const filtered = products.filter(p => p.id !== id);
    setLocalStorage(INITIAL_PRODUCTS_KEY, filtered);
  }
};
