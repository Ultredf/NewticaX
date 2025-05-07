import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import { Providers } from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "NewticaX - Berita Terbaru",
  description: "Aplikasi berita real-time dengan ringkasan berbasis AI",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pb-16">{children}</main>
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}