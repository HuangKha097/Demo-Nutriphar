import type { Role } from "./role";

export interface User {
  id: string;
  email: string;
  fullName: string;
  password?: string;
  roleId: string;
  role?: Role;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  email: string;
  fullName: string;
  password?: string;
  roleId: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;
