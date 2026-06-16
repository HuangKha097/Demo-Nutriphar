import { z } from "zod";
import { getLocalStorage, setLocalStorage, USE_MOCK } from "./api";
import { apiClient } from "@/lib/api-client";
import type { User, CreateUserDto, UpdateUserDto, PaginatedResponse, PaginationParams } from "@/types";

const INITIAL_USERS_KEY = "nutriphar_users";

export const DEFAULT_USERS: User[] = [
  {
    id: "1",
    email: "admin@nutriphar.vn",
    fullName: "Admin Nutriphar",
    roleId: "role-admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    email: "manager@nutriphar.vn",
    fullName: "Manager Nutriphar",
    roleId: "role-manager",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    email: "staff@nutriphar.vn",
    fullName: "Staff Nutriphar",
    roleId: "role-staff",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Zod Schemas & Types
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Địa chỉ email không hợp lệ").max(255),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(100),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const userCreateSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  roleId: z.string().min(1, "Vai trò là bắt buộc"),
});
export type UserCreateInput = z.infer<typeof userCreateSchema>;

export const userEditSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  password: z.string().optional(),
  roleId: z.string().min(1, "Vai trò là bắt buộc"),
});
export type UserEditInput = z.infer<typeof userEditSchema>;

export const profileSchema = z.object({
  fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  phone: z.string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^(0[3|5|7|8|9])+([0-9]{8})$/.test(val), {
      message: "Số điện thoại không đúng định dạng Việt Nam",
    }),
  address: z.string().optional().or(z.literal("")),
});
export type ProfileInput = z.infer<typeof profileSchema>;

export const securitySchema = z.object({
  oldPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
  confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu mới"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Xác nhận mật khẩu mới không khớp",
  path: ["confirmPassword"],
});
export type SecurityInput = z.infer<typeof securitySchema>;

export const userService = {
  async findAll(params?: PaginationParams): Promise<PaginatedResponse<User>> {
    if (!USE_MOCK) {
      return apiClient.get<PaginatedResponse<User>>("/users", params as any);
    }
    const users = getLocalStorage<User[]>(INITIAL_USERS_KEY, DEFAULT_USERS);
    let result = [...users];
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(u => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    
    const { roleService } = require("./role.service");
    const roles = await roleService.findAll();
    const data = result.map(u => ({
      ...u,
      role: roles.find((r: any) => r.id === u.roleId)
    }));
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const startIndex = (page - 1) * limit;
    const sliced = data.slice(startIndex, startIndex + limit);
    
    return { data: sliced, total, page, limit };
  },

  async findOne(id: string): Promise<User> {
    if (!USE_MOCK) {
      return apiClient.get<User>(`/users/${id}`);
    }
    const users = getLocalStorage<User[]>(INITIAL_USERS_KEY, DEFAULT_USERS);
    const user = users.find(u => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
  },

  async create(dto: CreateUserDto): Promise<User> {
    const validated = userCreateSchema.parse(dto);
    if (!USE_MOCK) {
      return apiClient.post<User>("/users", validated);
    }
    const users = getLocalStorage<User[]>(INITIAL_USERS_KEY, DEFAULT_USERS);
    const newUser: User = {
      ...validated,
      id: "user-" + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(newUser);
    setLocalStorage(INITIAL_USERS_KEY, users);
    return newUser;
  },

  async update(id: string, dto: UpdateUserDto & { phone?: string; address?: string }): Promise<User> {
    const isAdminUpdate = dto.email !== undefined || dto.roleId !== undefined;
    const validated = isAdminUpdate 
      ? userEditSchema.partial().parse(dto) 
      : profileSchema.partial().parse(dto);

    if (!USE_MOCK) {
      return apiClient.put<User>(`/users/${id}`, validated);
    }

    const users = getLocalStorage<User[]>(INITIAL_USERS_KEY, DEFAULT_USERS);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");
    
    const updated = {
      ...users[index],
      ...validated,
      updatedAt: new Date().toISOString()
    };
    users[index] = updated as any;
    setLocalStorage(INITIAL_USERS_KEY, users);
    return updated as any;
  },

  async remove(id: string): Promise<void> {
    if (!USE_MOCK) {
      return apiClient.delete<void>(`/users/${id}`);
    }
    const users = getLocalStorage<User[]>(INITIAL_USERS_KEY, DEFAULT_USERS);
    const filtered = users.filter(u => u.id !== id);
    setLocalStorage(INITIAL_USERS_KEY, filtered);
  }
};
