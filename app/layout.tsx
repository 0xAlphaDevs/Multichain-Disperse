import { ParticleConnectkit } from '@/connectkit';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Multichain Disperse',
  description: 'A chain abstracted disperse app for instant multi chain token transfer in single zap.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ParticleConnectkit>{children}</ParticleConnectkit>
        <Toaster />
      </body>
    </html>
  );
}
