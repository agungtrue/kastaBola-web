import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

// Load fonts dan simpan ke variabel CSS
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "KastaBola.id | Tentukan Kasta Tim Anda",
  description: "Platform meritokrasi sepak bola amatir berbasis data FIFA Elo Rating.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${oswald.variable} scroll-smooth`}>
      <body className="bg-brand-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}