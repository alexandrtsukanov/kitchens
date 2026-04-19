import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/header";
import { siteConfig, layoutConfig } from "@/config";
import Providers from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main
            className="flex flex-col w-full justify-start items-center"
            style={{
              height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`
            }}
          >
            {children}
          </main>

          <footer className="flex justify-center items-center" style={{ height: layoutConfig.footerHeight }}>
            <p>{siteConfig.description}</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
