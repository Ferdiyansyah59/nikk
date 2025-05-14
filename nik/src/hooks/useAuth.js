import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useState, useCallback } from "react";

export function useAuth() {
  const router = useRouter();
  const {
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    clearError,
    isAuthenticated,
    isAdmin,
    isPenjual,
    isPembeli,
  } = useAuthStore();

  const [loginError, setLoginError] = useState(null);

  // Login dengan redirect
  const loginWithRedirect = useCallback(
    async (email, password) => {
      setLoginError(null);

      try {
        await login(email, password);

        // Jika login berhasil, redirect sesuai peran
        const user = useAuthStore.getState().user;
        if (user) {
          if (user.role === "admin") {
            router.push("/admin/dashboard");
            console.log("Masukk admin")
          } else if (user.role === "penjual") {
            router.push("/penjual/dashboard");
            console.log("Masukk penjual")
          } else {
            router.push("/pembeli/dashboard");
          }
        }

        console.log("Masukk kok")
      } catch (error) {
        setLoginError(error.message || "Login failed");
        console.log("Disini gamasuk, ", error)
      }
    },
    [login, router]
  );

  // Logout dengan redirect
  const logoutWithRedirect = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  return {
    user,
    token,
    isLoading,
    error: error || loginError,
    loginWithRedirect,
    logoutWithRedirect,
    clearError,
    isAuthenticated,
    isAdmin,
    isPenjual,
    isPembeli,
  };
}