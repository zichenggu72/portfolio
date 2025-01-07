'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = ['memory', 'taste', 'graphic'];

export default function CreatePage() {
  const pathname = usePathname();

  return (
    <div className="main">
      <h1 className="font-semibold mb-6">Create</h1>
      <div className="flex gap-4 mb-8">
        {categories.map((category) => (
          <Link 
            key={category}
            href={category === 'memory' ? '/n/create' : `/n/create/${category}`}
            className={`text-sm px-3 py-1 rounded-md text-gray-400 hover:text-gray-600 ${
              (category === 'memory' && pathname === '/n/create') ||
              pathname === `/n/create/${category}`
                ? 'bg-gray-100 text-black' 
                : ''
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
} 