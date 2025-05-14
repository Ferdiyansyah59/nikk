// app/layout.js
import { Poppins } from "next/font/google";
import "./globals.css";

const getPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "A.N.I Tech",
  description: "About A.N.I",
  icons: {
    icon: "/img/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${getPoppins.variable} antialiased`}>{children}</body>
    </html>
  );
}