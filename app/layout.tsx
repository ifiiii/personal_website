import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/data";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: {
    default: `${site.siteTitle} | Ramen rankings & Japan travel`,
    template: `%s | ${site.siteTitle}`,
  },
  description: site.tagline,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <Navbar siteTitle={site.siteTitle} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
