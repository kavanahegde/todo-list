/* oxlint-disable react/only-export-components */

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [authError, setAuthError] = useState("");

  const login = async (userEmail, password) => {
    setAuthError("");

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password,
        }),
        credentials: "include",
      };

      const response = await fetch("/api/users/logon", options);
      const data = await response.json();

      if (
        response.status === 200 &&
        data.name &&
        data.csrfToken
      ) {
        setEmail(data.name);
        setToken(data.csrfToken);

        return {
          success: true,
        };
      }

      const message = `Authentication failed: ${
        data?.message ?? "Unknown error"
      }`;

      setAuthError(message);

      return {
        success: false,
        error: message,
      };
    } catch {
      const message = "Network error during login";

      setAuthError(message);

      return {
        success: false,
        error: message,
      };
    }
  };

  const logout = async () => {
    setAuthError("");

    if (!token) {
      setEmail("");
      setToken("");

      return {
        success: true,
      };
    }

    try {
      await fetch("/api/user/logoff", {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
      });
    } catch {
      // Local authentication should still be cleared
      // even if the logout request fails.
    } finally {
      setEmail("");
      setToken("");
      setAuthError("");
    }

    return {
      success: true,
    };
  };

  const clearAuthError = () => {
    setAuthError("");
  };

  const value = {
    email,
    token,
    isAuthenticated: !!token,
    authError,
    login,
    logout,
    clearAuthError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}