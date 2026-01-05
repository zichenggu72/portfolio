'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { oorangeregular } from 'app/fonts';

function NavItem({ color, text }: { 
  color: string; 
  text: string;
}) {
  const href = text.toLowerCase() === 'home' ? '/' : `/n/${text.toLowerCase()}`;
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
  
  return (
    <li className="flex items-center gap-3">
      <Link
        href={href}
        className={`flex items-center gap-3 transition-colors duration-200
          ${isActive
            ? 'text-gray-900 dark:text-gray-100'
            : 'text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 opacity-60 hover:opacity-100'}
        `}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span>{text}</span>
      </Link>
    </li>
  );
}

export default function Navigation() {
  return (
    <nav className={`hidden lg:fixed lg:left-0 lg:w-[200px] lg:h-screen lg:pl-[30px] lg:flex lg:flex-col lg:justify-center ${oorangeregular.className} text-xl`}>
      <ul className="space-y-6">
        <NavItem color="#FF5D1F" text="Home" />
        <NavItem color="#F8961E" text="Works" />
        <NavItem color="#F9C74F" text="Projects" />
        <NavItem color="#90BE6D" text="Create" />
        <NavItem color="#4D908E" text="Resources" />
    
      </ul>
    </nav>
  );
}