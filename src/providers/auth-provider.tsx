"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState
} from "react";
import type { ReactNode } from "react";

import { authService } from "@/services/auth-service";
import type { AuthUser } from "@/types/auth";
import type { UserPreferences } from "@/types/domain";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface SignInPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends SignInPayload {
  name: string;
  preferences: UserPreferences;
}

interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  signIn: (payload: SignInPayload) => Promise<{ error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ error?: string }>;
  forgotPassword: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  async function refreshSession() {
    const sessionUser = await authService.getSession();

    startTransition(() => {
      setUser(sessionUser);
      setStatus(sessionUser ? "authenticated" : "unauthenticated");
    });
  }

  async function signIn({ email, password }: SignInPayload) {
    try {
      const authUser = await authService.login(email, password);
      startTransition(() => {
        setUser(authUser);
        setStatus("authenticated");
      });
      return {};
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "No se pudo iniciar sesión."
      };
    }
  }

  async function register(payload: RegisterPayload) {
    try {
      const authUser = await authService.register(payload);
      startTransition(() => {
        setUser(authUser);
        setStatus("authenticated");
      });
      return {};
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "No se pudo crear la cuenta."
      };
    }
  }

  async function forgotPassword(email: string) {
    try {
      await authService.forgotPassword(email);
      return {};
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : "No se pudo enviar la recuperación."
      };
    }
  }

  async function signOut() {
    await authService.logout();

    startTransition(() => {
      setUser(null);
      setStatus("unauthenticated");
    });
  }

  useEffect(() => {
    let isMounted = true;

    void authService.getSession().then((sessionUser) => {
      if (!isMounted) {
        return;
      }

      startTransition(() => {
        setUser(sessionUser);
        setStatus(sessionUser ? "authenticated" : "unauthenticated");
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        signIn,
        register,
        forgotPassword,
        signOut,
        refreshSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
