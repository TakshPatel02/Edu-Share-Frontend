import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../lib/api";

const AppContext = createContext();
const TOKEN_STORAGE_KEY = "edushare_token";

export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_STORAGE_KEY) || "",
  );
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(
    Boolean(localStorage.getItem(TOKEN_STORAGE_KEY)),
  );

  useEffect(() => {
    let isMounted = true;

    const syncUser = async () => {
      if (!token) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        const response = await authApi.me(token);
        if (isMounted) {
          setUser(response.user || null);
        }
      } catch {
        if (isMounted) {
          setToken("");
          setUser(null);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    };

    syncUser();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const setAuthFromResponse = ({ token: nextToken, user: nextUser }) => {
    setToken(nextToken);
    setUser(nextUser || null);
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      token,
      user,
      authLoading,
      isAuthenticated: Boolean(token),
      setAuthFromResponse,
      logout,
    }),
    [searchQuery, token, user, authLoading],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
