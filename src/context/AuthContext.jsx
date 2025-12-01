import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to load current user if token exists
  useEffect(() => {
    const token = localStorage.getItem("taskflow_token");
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await axiosClient.get("/auth/me");
        setUser(res.data.user || res.data);
      } catch (err) {
        console.error("Failed to load current user, clearing token", err);
        localStorage.removeItem("taskflow_token");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔹 DEV FALLBACK: if backend fails, still log in with a fake user
  const devFallbackLogin = (overrides = {}) => {
    const fakeUser = {
      id: "dev-user",
      name: overrides.name || "Demo User",
      email: overrides.email || "demo@example.com",
    };
    console.warn("Using DEV fallback auth user:", fakeUser);
    setUser(fakeUser);
    localStorage.setItem("taskflow_token", "dev-token");
  };

  const login = async (email, password) => {
    try {
      const res = await axiosClient.post("/auth/login", { email, password });
      const { user, token } = res.data;
      setUser(user);
      if (token) {
        localStorage.setItem("taskflow_token", token);
      }
    } catch (err) {
      console.error("Login failed, using dev fallback user", err);
      // ✅ allow teammates to log in even if backend is not ready
      devFallbackLogin({ email });
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      const { user, token } = res.data;
      setUser(user);
      if (token) {
        localStorage.setItem("taskflow_token", token);
      }
    } catch (err) {
      console.error("Signup failed, using dev fallback user", err);
      // ✅ same idea: still let them into the app
      devFallbackLogin({ name, email });
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post("/auth/logout");
    } catch (err) {
      console.warn("Logout request failed, clearing token anyway", err);
    }
    localStorage.removeItem("taskflow_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
