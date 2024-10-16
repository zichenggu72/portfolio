import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Next.js Portfolio Starter",
    template: "%s | Next.js Portfolio Starter",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html
  lang="en"
  className={cx(
    "text-black bg-white dark:text-white dark:black",
    GeistSans.variable,
    GeistMono.variable
  )}
>
  <body className="antialiased">
    <div className="flex flex-row">
      <nav className="w-64 min-h-screen pl-[30px]">
        <Navbar />
      </nav>
      <main className="flex-1 max-w-3xl mx-auto px-4 mt-8">
        {children}
        {/* <Footer />
        <Analytics />
        <SpeedInsights /> */}
      </main>
    </div>
  </body>
</html>
  );
}
