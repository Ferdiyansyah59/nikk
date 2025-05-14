import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  // Gunakan try-catch di seluruh blok
  try {
    // Get auth cookie di server dengan pendekatan yang lebih eksplisit
    const cookiesList = await cookies();
    const authCookieValue = cookiesList.get("auth-storage")?.value;

    if (!authCookieValue) {
      redirect("/login");
    }

    const authData = JSON.parse(decodeURIComponent(authCookieValue));
    const user = authData.state?.user;

    // Cek jika user adalah admin
    if (user?.role !== "admin") {
      // Redirect jika bukan admin
      redirect("/");
    }

    console.log(cookiesList)

    return (
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.name}</p>
        {/* Isi halaman admin */}
      </div>
    );
  } catch (error) {
    console.error("Error in admin dashboard:", error);
    // Redirect jika terjadi error
    redirect("/login");
  }
}
