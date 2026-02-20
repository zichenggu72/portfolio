'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
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

  const getActiveIndex = () => {
    for (let i = tabs.length - 1; i >= 0; i--) {
      const tab = tabs[i];
      if (tab.path === '/') {
        if (pathname === '/') return i;
      } else if (tab.path === '/n/create') {
        if (pathname === '/n/create') return i;
      } else if (tab.path === '/n/create/graphic') {
        if (pathname === '/n/create/graphic' || pathname.startsWith('/n/create/graphic/')) return i;
      } else if (pathname === tab.path || pathname.startsWith(tab.path + '/')) {
        return i;
      }
    }
    return 0;
  };

  const activeIndex = getActiveIndex();
  const prevIndexRef = useRef(activeIndex);

  // going right (forward) = higher index = use spring layout animation
  // going left (backward) = lower index = instant, just fade
  const goingRight = activeIndex >= prevIndexRef.current;

  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  const isActive = (tab: { name: string; path: string; color: string }) => {
    if (tab.path === '/') return pathname === '/';
    if (tab.path === '/n/create') return pathname === '/n/create';
    if (tab.path === '/n/create/graphic') {
      return pathname === '/n/create/graphic' || pathname.startsWith('/n/create/graphic/');
    }
    return pathname === tab.path || pathname.startsWith(tab.path + '/');
  };

  return (
    <div className={`sticky top-0 mt-space-400 z-20 bg-white dark:bg-[#1a1a1a] ${oorangeregular.className}`}>
      <div className="border border-gray-200 dark:border-gray-700 rounded-[8px] p-1 flex w-full bg-white dark:bg-[#2B2B2B]">
        {tabs.map((tab) => (
          <motion.div
            key={tab.name}
            layout
            style={{ originX: 0 }}
            className={`relative sm:flex-1 ${isActive(tab) ? 'flex-1' : 'flex-none w-10'} overflow-hidden`}
            transition={
              goingRight
                ? { type: 'spring', stiffness: 500, damping: 40 }
                : { type: 'spring', stiffness: 800, damping: 60 }
            }
          >
            <Link
              href={tab.path}
              className={`relative flex items-center justify-center rounded-md text-xl whitespace-nowrap w-full h-full
                ${isActive(tab)
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
            >
              {isActive(tab) && (
                <motion.div
                  className="absolute inset-0 bg-gray-100 dark:bg-[#3D3D3D] rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
              )}
              <div className="relative z-10 flex items-center justify-center gap-2 px-4 py-1">
                <motion.span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tab.color }}
                  layout="position"
                />
                {isActive(tab) && (
                  <motion.span
                    className="overflow-hidden whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tab.name}
                  </motion.span>
                )}
                <span className="hidden sm:block">
                  {!isActive(tab) && tab.name}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
