import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "../components/AudioProvider";
import { AssetPreloader } from "../components/AssetPreloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "皇子英语乐园 - Cyber Dynasty",
  description: "Learn English with Dragon Kid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AudioProvider>
          <AssetPreloader />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
