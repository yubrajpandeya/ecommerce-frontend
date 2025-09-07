"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthResponse, LoginRequest, RegisterRequest, api } from "./api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        try {
          const userData = await api.getProfile(storedToken);
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem("authToken");
          setUser(null);
          setToken(null);
          console.error("Invalid token:", error);
        }
      } else {
        setUser(null);
        setToken(null);
      }

      setIsLoading(false);
      setIsInitialized(true);
    };

    initAuth();
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      console.log("AuthContext - Login request:", data);
      const response: AuthResponse = await api.login(data);
      console.log("AuthContext - Login response:", response);

      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("authToken", response.token);
      console.log("AuthContext - User set after login:", response.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await api.register(data);

      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("authToken", response.token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await api.logout(token);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("authToken");
    }
  };

  const refreshProfile = async () => {
    if (!token) return;

    try {
      const userData = await api.getProfile(token);
      setUser(userData);
    } catch (error) {
      // If profile fetch fails, logout
      await logout();
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: isInitialized && !!user && !!token,
    login,
    register,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
