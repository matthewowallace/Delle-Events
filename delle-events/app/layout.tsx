import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from '@/components/LightRays';
import Navbar from "@/components/Navbar";

const schibsted_Grotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delle Events",
  description: "Generating Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibsted_Grotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
      >
      <div className={"absolute inset-0 top-0 z-[-1] min-h-screen"}>
          <LightRays
              raysOrigin="top-center-offset"
              raysColor="#F5366B"
              raysSpeed={1.5}
              lightSpread={1.3}
              rayLength={1.5}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
          />
      </div>
      <Navbar/>
          <main>
            {children}
          </main>
      </body>
    </html>
  );
}
