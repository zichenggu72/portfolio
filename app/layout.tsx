// app/layout.tsx
import "./global.css";
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import 'mapbox-gl/dist/mapbox-gl.css';
import FooterContent from "./components/FooterContent";
import { graphik } from "./fonts";


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
        graphik.variable,
        "text-black bg-white dark:text-white dark:bg-[#1a1a1a]"
      )}
    >
      <body className="antialiased">
        <div className="min-h-screen">
          {/* Main content area */}
          <div className="max-w-[866px] mx-auto">
            <main className="w-full px-8 py-8 lg:py-10">
              {children}
            </main>
          </div>
        </div>
        
        <Analytics />
        <SpeedInsights />

        <FooterContent />

        <footer className="mt-24 pb-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="max-w-[866px] mx-auto px-8">
            © {new Date().getFullYear()} Designed and coded by Zicheng Gu
          </div>
        </footer>
        
      </body>
    </html>
  );
}