import { getLocalStorage, setLocalStorage } from "./api";
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

export const userService = {
  async findAll(params?: PaginationParams): Promise<PaginatedResponse<User>> {
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
    const users = getLocalStorage<User[]>(INITIAL_USERS_KEY, DEFAULT_USERS);
    const user = users.find(u => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
  },

  async create(dto: CreateUserDto): Promise<User> {
    const users = getLocalStorage<User[]>(INITIAL_USERS_KEY, DEFAULT_USERS);
    const newUser: User = {
      ...dto,
      id: "user-" + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(newUser);
    setLocalStorage(INITIAL_USERS_KEY, users);
    return newUser;
  },

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const users = getLocalStorage<User[]>(INITIAL_USERS_KEY, DEFAULT_USERS);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");
    
    const updated = {
      ...users[index],
      ...dto,
      updatedAt: new Date().toISOString()
    };
    users[index] = updated;
    setLocalStorage(INITIAL_USERS_KEY, users);
    return updated;
  },

  async remove(id: string): Promise<void> {
    const users = getLocalStorage<User[]>(INITIAL_USERS_KEY, DEFAULT_USERS);
    const filtered = users.filter(u => u.id !== id);
    setLocalStorage(INITIAL_USERS_KEY, filtered);
  }
};
