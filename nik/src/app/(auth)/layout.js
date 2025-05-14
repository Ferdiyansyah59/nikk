export const metadata = {
    title: "Auth - A.N.I Tech",
    description: "Sign in to A.N.I Tech",
  };
  
  export default function AuthLayout({children}) {
    return (
      <div className="auth-container min-h-screen flex items-center justify-center bg-gray-50">
        <div className="auth-card bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="auth-logo mb-6 text-center">
            <h2 className="text-2xl font-bold mt-2">A.N.I Tech</h2>
          </div>
  
          {children}
  
          <div className="mt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} A.N.I Tech. All rights reserved.
          </div>
        </div>
      </div>
    );
  }
  