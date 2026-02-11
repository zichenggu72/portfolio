// app/components/MobileNav.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { oorangeregular } from 'app/fonts';

function NavTab({ 
  color, 
  text, 
}: { 
  color: string; 
  text: string;
}) {
  const href = text.toLowerCase() === 'works' ? '/' : `/n/${text.toLowerCase()}`;
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
  
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 px-4 pt-1 pb-0.4 rounded-full text-xl whitespace-nowrap
        transition-all duration-200
        ${isActive
          ? 'text-gray-900 dark:text-gray-100 font-medium shadow-sm'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }
      `}
      style={isActive ? { backgroundColor: `${color}15` } : {}}
    >
      <div 
        className="w-1.5 h-1.5 rounded-full" 
        style={{ backgroundColor: color }} 
      />
      <span>{text}</span>
    </Link>
  );
}

export default function MobileNav() {
  return (
    <nav className={`lg:hidden sticky top-0 z-50 bg-white/80 dark:bg-[#2b2b2b]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 ${oorangeregular.className}`}>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 px-4 py-3 min-w-max">
          <NavTab color="#F8961E" text="Works" />
          <NavTab color="#F9C74F" text="Projects" />
          <NavTab color="#90BE6D" text="Create" />
          <NavTab color="#4D908E" text="Resources" />
        </div>
      </div>
    </nav>
  );
}