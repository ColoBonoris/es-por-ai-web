import type { UserPreferences } from "@/types/domain";

export type UserRole = "student" | "editor";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences?: UserPreferences;
}
