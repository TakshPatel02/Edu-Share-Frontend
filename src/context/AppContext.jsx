import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../lib/api";

const AppContext = createContext();
const TOKEN_STORAGE_KEY = "edushare_token";
const ROLE_STORAGE_KEY = "edushare_user_role";

export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_STORAGE_KEY) || "",
  );
  const [userRole, setUserRole] = useState(
    () => localStorage.getItem(ROLE_STORAGE_KEY) || "",
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
        setUserRole("");
        localStorage.removeItem(ROLE_STORAGE_KEY);
        setAuthLoading(false);
        return;
      }

      try {
        const response = await authApi.me(token);
        if (isMounted) {
          const nextUser = response.user || null;
          const nextRole = nextUser?.role || "";
          setUser(nextUser);
          setUserRole(nextRole);
          if (nextRole) {
            localStorage.setItem(ROLE_STORAGE_KEY, nextRole);
          } else {
            localStorage.removeItem(ROLE_STORAGE_KEY);
          }
        }
      } catch {
        if (isMounted) {
          setToken("");
          setUser(null);
          setUserRole("");
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(ROLE_STORAGE_KEY);
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
    const nextRole = nextUser?.role || "";
    setToken(nextToken);
    setUser(nextUser || null);
    setUserRole(nextRole);
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    if (nextRole) {
      localStorage.setItem(ROLE_STORAGE_KEY, nextRole);
    } else {
      localStorage.removeItem(ROLE_STORAGE_KEY);
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    setUserRole("");
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      token,
      user,
      userRole,
      authLoading,
      isAuthenticated: Boolean(token),
      isAdmin: userRole === "admin",
      setAuthFromResponse,
      logout,
    }),
    [searchQuery, token, user, userRole, authLoading],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
