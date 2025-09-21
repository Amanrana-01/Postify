import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "../Components/ClientWrapper";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Postify Blog",
  description: "A beautiful blog platform inspired by Postify, built with Next.js and PayloadCMS",
  keywords: ["blog", "postify", "cms", "nextjs", "payload", "typescript", "writing"],
  authors: [{ name: "Postify Blog" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Postify Blog",
    title: "Postify Blog",
          description: "A beautiful blog platform inspired by Postify, built with Next.js and PayloadCMS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Postify Blog",
        description: "A beautiful blog platform inspired by Postify, built with Next.js and PayloadCMS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>

          <div className="min-h-screen bg-white">
            <Header />
            <main className="main-content">
              {children}
            </main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
