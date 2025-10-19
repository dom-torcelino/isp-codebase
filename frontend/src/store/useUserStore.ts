"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";
// Intentionally kept for future use; UI should not call these now:
import { loginRequest, getProfile } from "@/lib/api";

type AuthStatus = "idle" | "loading" | "authenticated" | "error";

export interface UserState {
  user: User | null;
  token: string | null;
  status: AuthStatus;
  error: string | null;
}

export interface UserActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  hydrateFromStorage: () => void;
  fetchProfile: () => Promise<void>;
}

export type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      status: "idle",
      error: null,

      // Keep behavior for future integration; do not call from UI now
      async login(email, password) {
        set({ status: "loading", error: null });
        try {
          const { user, token } = await loginRequest(email, password);
          if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", token);
          }
          set({ user, token, status: "authenticated", error: null });
        } catch (error: any) {
          set({ 
            status: "error", 
            error: error?.message || "Login failed" 
          });
          throw error;
        }
      },

      logout() {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
        }
        set({ user: null, token: null, status: "idle", error: null });
      },

      setUser(user) {
        set({ user });
      },

      hydrateFromStorage() {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("auth_token");
          if (token && !get().token) {
            set({ token });
          }
        }
      },

      async fetchProfile() {
        try {
          const profile = await getProfile();
          set({ user: profile, status: "authenticated", error: null });
        } catch (error: any) {
          set({ 
            status: "error", 
            error: error?.message || "Failed to fetch profile" 
          });
          throw error;
        }
      }
    }),
    {
      name: "user-store",
      version: 1,
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : (undefined as unknown as Storage)
      ),
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      })
    }
  )
);

// Selectors for optimized re-renders
export const selectUser = (state: UserStore) => state.user;
export const selectStatus = (state: UserStore) => state.status;
export const selectError = (state: UserStore) => state.error;
export const selectIsAuthenticated = (state: UserStore) => 
  state.status === "authenticated" && state.user !== null;
