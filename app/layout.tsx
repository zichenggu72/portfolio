// app/layout.tsx
import "./global.css";
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import Navigation from './n/components/Navigation';
import MobileNav from './n/components/MobileNav';
import 'mapbox-gl/dist/mapbox-gl.css';
import { oorangeregular } from './fonts';


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Zicheng Gu",
    template: "",
  },
  description: "OOrande Design",
  openGraph: {
    title: "Zicheng Gu",
    description: "A curated collection of projects, passion, and design stories by Zicheng",
    url: baseUrl,
    siteName: "OOrande Design",
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
  icons: {
    icon: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737145010/image_20_k3fgrq.png',  // 32x32
    apple: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737145010/image_20_k3fgrq.png',  // 180x180
    shortcut: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737145010/image_20_k3fgrq.png',
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
        "text-black bg-white dark:text-white dark:black font-graphik"
      )}
    >
      <body className="antialiased">
        {/* Mobile Navigation */}
        <MobileNav />

        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* Desktop Navigation */}
          <Navigation />

        
            {/* Main content area */}
            <div className="max-w-[680px] md:mx-auto">
            <main className="w-full lg:w-[680px] px-8 lg:px-8 py-8 lg:py-10">
              {children}
            </main>
          </div>
        </div>
        
        <Analytics />
        <SpeedInsights />
        
        <footer className="mt-24 pb-8 text-sm text-gray-500">
          <div className="max-w-2xl mx-auto px-8">
            © {new Date().getFullYear()} Designed and coded by Zicheng Gu
          </div>
        </footer>
        
      </body>
    </html>
  );
}