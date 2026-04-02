import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "../components/AudioProvider";
import { AssetPreloader } from "../components/AssetPreloader";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "皇子英语乐园 - Royal Cyber Garden",
  description: "Learn English with Dragon Kid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="font-sans">
        <AudioProvider>
          <AssetPreloader />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
