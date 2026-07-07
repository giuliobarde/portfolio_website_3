"use client";

import { JetBrains_Mono, Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/components/v4/ThemeProvider";
import Navbar from "@/components/v4/Navbar";
import Footer from "@/components/v4/Footer";
import BackgroundEffects from "@/components/v4/BackgroundEffects";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function V4LayoutWrapper({
  children,
  webIconUrl,
  userName,
  version = "v4",
  resumeText,
  resumeUrl,
  websiteVersions,
  githubUrl,
  linkedinUrl,
}: {
  children: React.ReactNode;
  webIconUrl?: string;
  userName?: string;
  version?: "v3" | "v4";
  resumeText?: string;
  resumeUrl?: string;
  websiteVersions?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
}) {
  return (
    <div
      className={`${jetbrainsMono.variable} ${inter.variable} antialiased`}
      style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange={false}
      >
        <MotionConfig reducedMotion="user">
          <BackgroundEffects />
          <Navbar webIconUrl={webIconUrl} userName={userName} currentVersion={version} resumeText={resumeText} resumeUrl={resumeUrl} websiteVersions={websiteVersions} />
          <main className="relative">{children}</main>
          <Footer userName={userName} githubUrl={githubUrl} linkedinUrl={linkedinUrl} />
        </MotionConfig>

        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </div>
  );
}
