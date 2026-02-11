'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { oorangeregular } from '../fonts';

const tabs = [
  { name: 'works', path: '/', color: '#FF5D1F' },
  { name: 'projects', path: '/n/projects', color: '#F8961E' },
  { name: 'photography', path: '/n/create', color: '#F9C74F' },
  { name: 'graphics', path: '/n/create/graphic', color: '#90BE6D' },
  { name: 'inspirations', path: '/n/inspirations', color: '#43AA8B' },
];

export default function MainTabs() {
  const pathname = usePathname();

  const isActive = (tab: { name: string; path: string; color: string }) => {
    if (tab.path === '/') {
      return pathname === '/';
    }
    if (tab.path === '/n/create') {
      // Photography tab is active only for /n/create exactly (not /n/create/graphic)
      return pathname === '/n/create';
    }
    if (tab.path === '/n/create/graphic') {
      return pathname === '/n/create/graphic' || pathname.startsWith('/n/create/graphic/');
    }
    return pathname === tab.path || pathname.startsWith(tab.path + '/');
  };

  return (
    <div className={`sticky top-0 mt-space-400 z-20 bg-white dark:bg-[#1a1a1a] ${oorangeregular.className}`}>
      <div className="border border-gray-200 dark:border-gray-700 rounded-[8px] p-1 flex w-full bg-white dark:bg-[#2B2B2B]">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.path}
            className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-1 rounded-md transition-all duration-200 text-xl ${
              isActive(tab)
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            {isActive(tab) && (
              <motion.div
                layoutId="mainActiveTab"
                className="absolute inset-0 bg-gray-100 dark:bg-[#3D3D3D] rounded-md"
                initial={false}
                transition={{
                  type: "tween",
                  ease: "easeOut",
                  duration: 0.15
                }}
              />
            )}
            <span
              className="relative z-10 w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: tab.color }}
            />
            <span className="relative z-10">{tab.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
