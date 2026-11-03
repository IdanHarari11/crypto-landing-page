import { Geist, Geist_Mono } from "next/font/google";
import { GradientBlobs } from "@/components/ui/gradient-blobs";
import "./globals.css";
import Head from 'next/head';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Caesar Change",
  description: "Caesar Change: Your trusted partner in cryptocurrency exchange.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <Head>
        <title>Caesar Change</title>
        <meta name="description" content="Caesar Change: Your trusted partner in cryptocurrency exchange." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GradientBlobs />
        {children}
      </body>
    </html>
  );
}
