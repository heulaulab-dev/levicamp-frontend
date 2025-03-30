import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@styles/globals.css";
import Navbar from "@components/navbar";
import Footer from "@components/footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Levicamp",
  description: "Platform terbaik untuk berkemah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className= {`${plusJakartaSans.variable} antialiased bg-black` }>
        <Navbar /> {/* Navbar muncul di semua halaman */}
        <main>{children}</main>
        <Footer /> {/* Footer muncul di semua halaman */}
      </body>
    </html>
  );
}
