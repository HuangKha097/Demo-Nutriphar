import type { User } from "@/types/user";

export interface News {
  id: string;
  title: string;
  content: string;
  authorId: string;
  image?: string;
  author?: User;
  createdAt?: string;
  updatedAt?: string;
  date?: string;
}

export interface CreateNewsDto {
  title: string;
  content: string;
  authorId: string;
  image?: string;
}

export type UpdateNewsDto = Partial<CreateNewsDto>;
