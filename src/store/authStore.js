import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;

const extractUserFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      userName: decoded.userName,
      name: decoded.name,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Invalid JWT token:", error);
    return null;
  }
};

const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
const initialUser = storedAccessToken
  ? extractUserFromToken(storedAccessToken)
  : null;

export const useAuthStore = create((set) => ({
  authUser: initialUser,
  isLoggedIn: Boolean(initialUser),
  accessToken: storedAccessToken,

  setAccessToken: (accessToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    const user = extractUserFromToken(accessToken);
    set({ accessToken, authUser: user, isLoggedIn: Boolean(user) });
  },

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    set({ authUser: null, isLoggedIn: false, accessToken: null });
  },
}));
