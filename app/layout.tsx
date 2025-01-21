// app/layout.tsx
import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import Link from 'next/link';
import 'mapbox-gl/dist/mapbox-gl.css';
import { oorangeregular } from './fonts';
import MobileNav from './n/components/MobileNav';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Zicheng Gu",
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
  icons: {
    icon: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737145010/image_20_k3fgrq.png',  // 32x32
    apple: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737145010/image_20_k3fgrq.png',  // 180x180
    shortcut: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737145010/image_20_k3fgrq.png',
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

function NavItem({ color, text, extraClasses = "" }: { 
  color: string; 
  text: string;
  extraClasses?: string;
}) {
  const href = text.toLowerCase() === 'home' ? '/' : `/n/${text.toLowerCase()}`;
  
  return (
    <li className={`flex items-center gap-3 ${extraClasses}`}>
      <Link href={href} className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span>{text}</span>
      </Link>
    </li>
  );
}

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
          <nav className="hidden lg:fixed lg:left-0 lg:w-[200px] lg:h-screen lg:pl-[30px] lg:flex lg:flex-col lg:justify-between">
            <div className="pt-10">
              <NavItem color="#FF5D1F" text="Home" />
            </div>

            <ul className="space-y-6">
              <NavItem color="#F8961E" text="Works" />
              <NavItem color="#F9C74F" text="Projects" />
              <NavItem color="#90BE6D" text="Create" />
              <NavItem color="#4D908E" text="Resources" />
            </ul>

            <div className="pb-10">
              <NavItem color="#FF5D1F" text="Visitors (coming soon)" />
            </div>
          </nav>

        
            {/* Main content area */}
            <div className="mx-auto max-w-[680px]">
            <main className="w-full lg:w-[680px] px-4 lg:px-8 py-6 lg:py-10">
              {children}
            </main>
          </div>
        </div>
        
        <Analytics />
        <SpeedInsights />
        
        <footer className="mt-24 pb-8 text-sm text-gray-500">
          <div className="max-w-2xl mx-auto px-8">
            © {new Date().getFullYear()} Zicheng Gu
          </div>
        </footer>
      </body>
    </html>
  );
}