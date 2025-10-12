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
      if (!jwt) {
        return;
      }

      // Verify jwt on the server
      // Prevents "I thought I was logged in but my token is expired" or such
      const response = fetch("/api/whoami", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          baseSetAuthContextValue({ jwt });
        } else {
          localStorage.removeItem("jwt");
          baseSetAuthContextValue({});
        }
      });

      baseSetAuthContextValue({ jwt });
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
