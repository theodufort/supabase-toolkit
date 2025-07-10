// User-related TypeScript interfaces and types

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  user_id: string;
  bio?: string;
  website?: string;
  location?: string;
  social_links?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export type UserRole = "user" | "admin" | "moderator";

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserRequest {
  name?: string;
  avatar_url?: string;
  bio?: string;
}
