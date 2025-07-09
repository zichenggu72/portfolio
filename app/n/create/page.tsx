'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const categories = ['memory', 'taste', 'graphic'];

export default function CreatePage() {
  const pathname = usePathname();
  const [direction, setDirection] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Determine active tab from pathname
  useEffect(() => {
    if (pathname === '/n/create') {
      setActiveTab(0);
    } else if (pathname === '/n/create/taste') {
      setActiveTab(1);
    } else if (pathname === '/n/create/graphic') {
      setActiveTab(2);
    }
  }, [pathname]);

  const handleTabClick = (index: number, category: string) => {
    const newDirection = index > activeTab ? 1 : -1;
    setDirection(newDirection);
  };

  const contentVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        opacity: { duration: 0.4, ease: "easeOut" as const },
        x: { duration: 0.25, ease: "easeOut" as const }
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -50 : 50,
      transition: {
        opacity: { duration: 0.15, ease: "easeIn" as const },
        x: { duration: 0.2, ease: "easeIn" as const }
      }
    })
  };

  return (
    <div className="main">
      <h1 className="font-semibold mb-6">Create</h1>
      
      {/* Animated Tab Navigation */}
      <div className="relative mb-6">
        <div className="flex gap-2">
          {categories.map((category, index) => (
            <Link 
              key={category}
              href={category === 'memory' ? '/n/create' : `/n/create/${category}`}
              onClick={() => handleTabClick(index, category)}
              className={`relative text-sm px-3 py-1 rounded-md transition-all duration-200 hover:text-gray-600 ${
                (category === 'memory' && pathname === '/n/create') ||
                pathname === `/n/create/${category}`
                  ? 'text-gray-700'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {/* Animated background */}
              {((category === 'memory' && pathname === '/n/create') ||
                pathname === `/n/create/${category}`) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gray-100 rounded-md"
                  initial={false}
                  transition={{
                    type: "tween",
                    ease: "easeOut",
                    duration: 0.15
                  }}
                />
              )}
              
              <span className="relative z-10">{category}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Animated Content Area */}
      <div className="relative">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={pathname}
            custom={direction}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            {/* Original content will be rendered by the actual page components */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}