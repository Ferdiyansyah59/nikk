import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// API URL
const API_URL = process.env.API_ROUTE || "http://localhost:8081/api";

// Create auth store dengan persistensi
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Login action
      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });

          // Call API
          const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
          });

          const token = response.data.data.token;
          const user = response.data.data;
          console.log(user)

          // Update state
          set({ user, token, isLoading: false });
          // Set auth header untuk requests berikutnya
          axios.defaults.headers.common["Authorization"] = `${token}`;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Login failed. Please try again.";
          set({
            error: errorMessage,
            isLoading: false,
            user: null,
            token: null,
          });
        }
      },

      // Register action
      register: async (name, email, password, role) => {
        try {
          set({ isLoading: true, error: null });

          // Call API
          const response = await axios.post(`${API_URL}/register`, {
            name,
            email,
            password,
            role,
          });

          const { user, token } = response.data;

          // Update state
          set({ user, token, isLoading: false });

          // Set auth header untuk requests berikutnya
          axios.defaults.headers.common["Authorization"] = `${token}`;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Registration failed. Please try again.";
          set({
            error: errorMessage,
            isLoading: false,
          });
        }
      },

      // Logout action
      logout: () => {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];

        // Clear state
        set({ user: null, token: null, error: null });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Helper untuk cek autentikasi
      isAuthenticated: () => {
        const token = get().token;
        if (!token) return false;

        try {
          // Check token validity (expiration)
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          return decoded.exp > currentTime;
        } catch {
          return false;
        }
      },

      // Helper untuk cek role
      isAdmin: () => {
        return get().user?.role === "admin";
      },

      isPenjual: () => {
        return get().user?.role === "penjual";
      },

      isPembeli: () => {
        return get().user?.role === "pembeli";
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          // Get dari cookies
          const cookies = document.cookie.split(';');
          const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
          return cookie ? cookie.split('=')[1] : null;
        },
        setItem: (name, value) => {
          // Set ke cookies
          document.cookie = `${name}=${value};path=/;max-age=86400`; // 1 hari
        },
        removeItem: (name) => {
          // Hapus cookie
          document.cookie = `${name}=;path=/;max-age=0`;
        }
      })),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

// Set auth header dari storage saat aplikasi dimuat
if (typeof window !== "undefined") {
  const token = useAuthStore.getState().token;
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  }
}