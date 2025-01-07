'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


type Recipe = {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
}

const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Muchim',
    image: '/placeholder.jpg',  // Temporarily using a placeholder
    ingredients: [
      '+ avocado',
      '+ salmon sashimi',
      '+ apple or pear'
    ]
  },
  {
    id: '2',
    title: 'Muchim',
    image: '/placeholder.jpg',  // Temporarily using a placeholder
    ingredients: [
      '+ avocado',
      '+ salmon sashimi',
      '+ apple or pear'
    ]
  },
  {
    id: '3',
    title: 'Muchim',
    image: '/placeholder.jpg',  // Temporarily using a placeholder
    ingredients: [
      '+ avocado',
      '+ salmon sashimi',
      '+ apple or pear'
    ]
  }
];

const categories = ['memory', 'taste', 'graphic'];

export default function TastePage() {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category: string) => {
    if (category === 'taste') {
      return;
    }
    router.push('/n/create');
  };

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

      {/* Subtitle */}
      <h2 className="text-lg mb-12">
        Recipe reimagined,<br />
        based on inspiring dining experiences across the world
      </h2>

      {/* Recipe List */}
      <div className="space-y-16">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flex gap-8">
            {/* Image */}
            <div className="w-[160px] h-[160px] bg-gray-100 flex-shrink-0">
              {/* Temporarily commenting out Image until we have proper images */}
              {/*<Image
                src={recipe.image}
                alt={recipe.title}
                width={240}
                height={240}
                className="object-cover w-full h-full"
              />*/}
            </div>

            {/* Description */}
            <div className="flex-1">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                {recipe.title}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </h3>
              <div className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <p key={index} className="text-gray-600">{ingredient}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 