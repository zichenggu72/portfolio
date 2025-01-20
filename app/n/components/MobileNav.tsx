// app/components/MobileNav.tsx
'use client';  // Mark this as a client component

import { useState } from 'react';
import Link from 'next/link';

function NavItem({ 
  color, 
  text, 
  extraClasses = "", 
  onClick 
}: { 
  color: string; 
  text: string;
  extraClasses?: string;
  onClick?: () => void;
}) {
  const href = text.toLowerCase() === 'home' ? '/' : `/n/${text.toLowerCase()}`;
  
  return (
    <li className={`flex items-center gap-3 ${extraClasses}`}>
      <Link 
        href={href} 
        className="flex items-center gap-3"
        onClick={onClick}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span>{text}</span>
      </Link>
    </li>
  );
}

export default function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button 
          className="md:hidden fixed top-4 right-4 z-50 p-2 text-gray-800 hover:text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        lg:hidden fixed inset-0 bg-white dark:bg-black z-40
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 font-md">
          <NavItem color="#FF5D1F" text="Home" onClick={() => setIsMenuOpen(false)} />
          <NavItem color="#F8961E" text="Works" onClick={() => setIsMenuOpen(false)} />
          <NavItem color="#F9C74F" text="Projects" onClick={() => setIsMenuOpen(false)} />
          <NavItem color="#90BE6D" text="Create" onClick={() => setIsMenuOpen(false)} />
          <NavItem color="#4D908E" text="Resources" onClick={() => setIsMenuOpen(false)} />
        </div>
      </div>
    </>
  );
}