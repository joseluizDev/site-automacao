import type { Metadata } from "next";
import { cn } from '@/lib/utils';
import { League_Spartan } from 'next/font/google';
import "./globals.css";

const league = League_Spartan({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Automação WhatsApp",
  description: "Automação WhatsApp",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br">
      <body className={cn("min-h-screen bg-background font-sans antialiased", league.className)}>
        {children}
      </body>
    </html>
  );
}
