'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const categories = ['memory', 'taste', 'graphic'];

export default function CreateTabs() {
  const pathname = usePathname();
  
  return (
    <div className="relative mb-6 z-10">
      <div className="border border-gray-200 rounded-[8px] p-0.5 inline-block bg-white">
        <div className="flex gap-2">
          {categories.map((category) => (
            <Link 
              key={category}
              href={category === 'memory' ? '/n/create' : `/n/create/${category}`}
              className={`relative text-sm px-3 py-1 rounded-md transition-all duration-200 hover:text-gray-600 ${
                (category === 'memory' && pathname === '/n/create') ||
                pathname === `/n/create/${category}`
                  ? 'text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {/* Animated background */}
              {((category === 'memory' && pathname === '/n/create') ||
                pathname === `/n/create/${category}`) && (
                <motion.div
                  layoutId="createActiveTab"
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
    </div>
  );
}

