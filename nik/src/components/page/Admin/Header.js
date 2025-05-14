"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { isAuthenticated, user, logoutWithRedirect } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-indigo-600">
              MyApp
            </Link>
          </div>

          <div className="flex items-center">
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.name}
                </span>
                <Link
                  href={`/${user?.role}/dashboard`}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logoutWithRedirect}
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
