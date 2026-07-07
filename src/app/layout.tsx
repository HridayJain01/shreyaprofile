import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Caveat, Homemade_Apple } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const homemade = Homemade_Apple({
  variable: "--font-homemade",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Shreya Chawale — An Editorial",
  description:
    "The story of a software engineer who believes technology can be elegant, emotional, and beautifully crafted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${caveat.variable} ${homemade.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
