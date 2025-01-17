// app/layout.tsx
import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import Link from 'next/link';
import 'mapbox-gl/dist/mapbox-gl.css';
import localFont from 'next/font/local'

const oorangeregular = localFont({
  src: [
    {
      path: './fonts/Oorange-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})

export { oorangeregular }

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
        {/* Make the entire layout full height */}
        <div className="min-h-screen">
          {/* Fixed navigation */}
          <nav className="fixed left-0 w-[200px] h-screen pl-[30px] flex flex-col justify-between">
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
              <NavItem color="#FF5D1F" text="Visitors" />
            </div>
          </nav>

          {/* Centered content area - adjusted positioning */}
          <div className="flex justify-center">
            <main className="w-[680px] px-8 py-10 min-h-screen">
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

function NavItem({ color, text, extraClasses = "" }: { 
  color: string; 
  text: string;
  extraClasses?: string;
}) {
  // Convert text to lowercase for the URL
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