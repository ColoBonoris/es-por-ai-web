import type { AuthUser } from "@/types/auth";

interface MockUserRecord extends AuthUser {
  password: string;
}

export const mockUsers: MockUserRecord[] = [
  {
    id: "demo-user",
    name: "María González",
    email: "demo@esporai.dev",
    password: "Acceso123!",
    role: "CLIENT",
    preferences: {
      accessibilityFeatures: ["gluten_free", "pet_friendly"]
    }
  }
];

export function toAuthUser(user: MockUserRecord): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}
