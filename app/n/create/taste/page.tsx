'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  sauce: string[];
  steps: string[];
}

const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Muchim',
    description: 'Spicy Korean salad',
    image: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736723094/Untitled-1_1_rwxp03.png',
    ingredients: [
      '+ avocado',
      '+ salmon sashimi',
      '+ apple or pear',
      '+ perilla leaf',
      '+ cucumber',
      '+ baby gem lettuce',
      '+ jalapeño',
      '+ roasted white sesame seed',
      '+ soya powder'
    ],
    sauce: [
      '+ gochujiang',
      '+ korean chili powder',
      '+ soy sauce',
      '+ honey',
      '+ sesame oil'
    ],
    steps: [
      '· whisk together all dressing ingredients. set aside.',
      '· artfully arrange the salmon sashimi slices.',
      '· gently toss the avocado, apple or pear, cucumber, baby gem lettuce, and perilla leaves with half of the dressing.',
      '· place the dressed vegetables and fruits over and around the salmon.',
      '· sprinkle the jalapeño slices over the dish for a pop of color and heat.',
      '· drizzle the remaining dressing over the entire dish.',
      '· sprinkle roasted white sesame seeds and soya powder over the top.',
      '· serve immediately, encouraging diners to mix everything together before eating.'
    ]
  },
  {
    id: '2',
    title: 'Bibimbap',
    description: 'Hot stone mixed rice',
    image: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736723094/Untitled-4_1_p8oy1s.png',
    ingredients: [
      '+ steamed rice',
      '+ spinach',
      '+ carrots',
      '+ bean sprouts',
      '+ mushrooms',
      '+ beef bulgogi',
      '+ fried egg',
      '+ nori strips',
      '+ kimchi'
    ],
    sauce: [
      '+ gochujang',
      '+ sesame oil',
      '+ soy sauce',
      '+ garlic',
      '+ sugar'
    ],
    steps: [
      '· prepare steamed rice and set aside.',
      '· sauté each vegetable separately with salt and sesame oil.',
      '· cook marinated beef bulgogi until browned.',
      '· fry egg sunny-side up.',
      '· arrange rice in a bowl.',
      '· place vegetables and beef in sections around the rice.',
      '· top with fried egg and nori strips.',
      '· serve with gochujang sauce and kimchi on the side.'
    ]
  },
  {
    id: '3',
    title: 'Japchae',
    description: 'Stir-fried glass noodles',
    image: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736723094/Untitled-3_1_tgizbr.png',
    ingredients: [
      '+ sweet potato noodles',
      '+ spinach',
      '+ carrots',
      '+ onions',
      '+ mushrooms',
      '+ beef strips',
      '+ eggs',
      '+ green onions',
      '+ sesame seeds'
    ],
    sauce: [
      '+ soy sauce',
      '+ sesame oil',
      '+ brown sugar',
      '+ garlic',
      '+ black pepper'
    ],
    steps: [
      '· soak sweet potato noodles in warm water.',
      '· julienne all vegetables.',
      '· scramble eggs and cook into thin omelette, then slice.',
      '· cook beef strips with sauce.',
      '· blanch spinach and season.',
      '· stir-fry remaining vegetables.',
      '· cook noodles and mix with sauce.',
      '· combine all ingredients and garnish with sesame seeds.'
    ]
  }
];

const categories = ['memory', 'taste', 'graphic'];

export default function TastePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleCategoryClick = (category: string) => {
    if (category === 'taste') {
      return;
    }
    router.push('/n/create');
  };

  return (
    <div className="main">
      <h1 className="font-semibold mb-6">Create</h1>
      <div className="flex gap-4 mb-6">
        {categories.map((category) => (
          <Link 
            key={category}
            href={category === 'memory' ? '/n/create' : `/n/create/${category}`}
            className={`text-sm px-3 py-1 rounded-md text-gray-400 hover:text-gray-600 ${
              (category === 'memory' && pathname === '/n/create') ||
              pathname === `/n/create/${category}`
                ? 'bg-gray-100 text-gray-700' 
                : ''
            }`}
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Subtitle */}
      <h2 className="text-gray-600 mb-8">
        Recipe reimagined,<br />
        based on inspiring dining experiences across the world
      </h2>

      {/* Recipe List */}
      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id}
            className="flex gap-4 cursor-pointer"
            onClick={() => setSelectedRecipe(recipe)}
          >
            {/* Image */}
            <div className="w-[60px] h-[60px] bg-gray-100 flex-shrink-0">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={125}
                height={125}
                className="object-cover w-full h-full rounded-md"
              />
            </div>

            {/* Description */}
            <div className="flex-1">
              <h3 className="font-semibold mb-0 flex items-center gap-1">
                {recipe.title}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </h3>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 w-1/2 h-screen bg-white transform 
          transition-transform duration-300 ease-in-out z-30 p-12 overflow-y-auto
          ${selectedRecipe ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {selectedRecipe && (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-2">{selectedRecipe.title}</h2>
              <p className="text-gray-600">= Spicy Korean salad</p>
            </div>

            <div className="w-full h-48 relative mb-12">
              <Image
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-lg mb-4">Ingredients</h3>
                <div className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <p key={index} className="text-gray-600">{ingredient}</p>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg mb-4">Sauce</h3>
                <div className="space-y-2">
                  {selectedRecipe.sauce.map((ingredient, index) => (
                    <p key={index} className="text-gray-600">{ingredient}</p>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-4">Steps</h3>
              <div className="space-y-3">
                {selectedRecipe.steps.map((step, index) => (
                  <p key={index} className="text-gray-600">{step}</p>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-8 right-8 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </>
        )}
      </div>

      {/* Backdrop */}
      {selectedRecipe && (
        <div 
          className="fixed inset-0 bg-gray-500/8 transition-all duration-300 ease-in-out z-20"
          onClick={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
} 