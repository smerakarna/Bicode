"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  jwt?: string;
};

const AuthContext = createContext<
  [AuthContextType, (value: AuthContextType) => void, () => void] | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authContextValue, baseSetAuthContextValue] = useState<AuthContextType>(
    {}
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        baseSetAuthContextValue({ jwt });
      }
    }
  }, []);

  const setAuthContextValue = useCallback((value: AuthContextType) => {
    if (value.jwt) {
      localStorage.setItem("jwt", value.jwt);
    } else {
      localStorage.removeItem("jwt");
    }
    baseSetAuthContextValue(value);
  }, []);

  const logout = useCallback(() => {
    setAuthContextValue({});
  }, []);

  return (
    <AuthContext.Provider
      value={[authContextValue, setAuthContextValue, logout]}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
