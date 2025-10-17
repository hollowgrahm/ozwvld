import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inconsolata",
});

export const metadata: Metadata = {
  title: "OZWVLD - Limited Release",
  description: "Limited release urban apparel collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inconsolata.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
