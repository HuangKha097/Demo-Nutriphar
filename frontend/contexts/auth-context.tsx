"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

interface AuthContextType {
  currentUserId: string | null;
  login: (id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState<string | null>("1");

  useEffect(() => {
    const storedId = getCookie("cms-auth-uid");
    if (storedId && typeof storedId === "string") {
      setCurrentUserId(storedId);
    } else {
      // Default to admin user ID "1" for direct admin dashboard mock access
      setCurrentUserId("1");
      setCookie("cms-auth-uid", "1", { maxAge: 30 * 24 * 60 * 60, path: "/", sameSite: "lax" });
    }
  }, []);

  const login = (id: string) => {
    setCurrentUserId(id);
    setCookie("cms-auth-uid", id, { maxAge: 30 * 24 * 60 * 60, path: "/", sameSite: "lax" });
  };

  const logout = () => {
    setCurrentUserId(null);
    deleteCookie("cms-auth-uid", { path: "/" });
  };

  return (
    <AuthContext.Provider value={{ currentUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
