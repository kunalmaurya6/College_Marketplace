import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchData, getAuthToken, setAuthToken } from "../api/server";
import { AuthContext } from "./AuthContextCore";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getAuthToken());
  const [loading, setLoading] = useState(Boolean(getAuthToken()));

  useEffect(() => {
    const loadUser = async () => {
      const savedToken = getAuthToken();

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetchData("/auth/me");
        setUser(response.user);
        setToken(savedToken);
      } catch {
        setAuthToken("");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const applyAuth = (response) => {
    setAuthToken(response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  };

  const login = useCallback(async (payload) => {
    const response = await fetchData("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return applyAuth(response);
  }, []);

  const signup = useCallback(async (payload) => {
    const response = await fetchData("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return applyAuth(response);
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetchData("/auth/logout", { method: "POST" });
    } catch {
      // Local logout should still complete if the API is unreachable.
    }

    setAuthToken("");
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      signup,
      logout,
    }),
    [user, token, loading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
