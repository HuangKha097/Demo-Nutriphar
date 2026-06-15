import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Địa chỉ email không hợp lệ").max(255),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").max(100),
});
export type LoginInput = z.infer<typeof loginSchema>;

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

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Tên danh mục là bắt buộc").max(80),
  image: z.string().trim().optional(),
});
export type CategoryInput = z.infer<typeof categorySchema>;

export const newsSchema = z.object({
  title: z.string().trim().min(1, "Tiêu đề là bắt buộc").max(200),
  content: z.string().trim().min(1, "Nội dung là bắt buộc").max(10000),
  image: z.string().trim().optional(),
});
export type NewsInput = z.infer<typeof newsSchema>;

export const userCreateSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  roleId: z.string().min(1, "Vai trò là bắt buộc"),
});

export const userEditSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  password: z.string().optional(),
  roleId: z.string().min(1, "Vai trò là bắt buộc"),
});
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserEditInput = z.infer<typeof userEditSchema>;

export const roleCreateSchema = z.object({
  roleName: z.string().min(2, "Tên vai trò phải có ít nhất 2 ký tự"),
  description: z.string().optional(),
  permissions: z.record(z.string(), z.record(z.string(), z.boolean())).optional(),
});

export const roleEditSchema = roleCreateSchema;

export type RoleCreateInput = z.infer<typeof roleCreateSchema>;
export type RoleEditInput = z.infer<typeof roleEditSchema>;
