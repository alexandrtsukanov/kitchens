import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/header";
import { siteConfig, layoutConfig } from "@/config";
import Providers from "@/providers";
import AuthObserver from "@/hocs/authObserver";
import Title from "@/components/layout/title";

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
                    <AuthObserver>
                        <div className="flex min-h-screen flex-col justify-between">
                            <div className="flex flex-col">
                                <Header />
                                <main className="flex flex-col w-full justify-start items-center">
                                    <Title />
                                    {children}
                                </main>
                            </div>

                            <footer className="flex justify-center items-center" style={{ height: layoutConfig.footerHeight }}>
                                <p>{siteConfig.description}</p>
                            </footer>
                        </div>
                    </AuthObserver>
                </Providers>
            </body>
        </html>
    );
}
