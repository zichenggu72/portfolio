'use client';
import { useState, useEffect } from 'react';
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
  sauce?: string[];
  steps: string[];
}

const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Muchim',
    description: 'Spicy Korean salad',
    image: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737400479/IMG_1087_oa0zll.png',
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
    title: 'Matcha hummus',
    description: 'Asian-inspired hummus',
    image: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737400478/IMG_1088_xpkmwf.png',
    ingredients: [
      '+ Match powder',
      '+ coconut milk',
      '+ dates, pitted and soaked',
      '+ canned chickpeas',
    ],
    // sauce: [
    //   '+ gochujang',
    //   '+ sesame oil',
    //   '+ soy sauce',
    //   '+ garlic',
    //   '+ sugar'
    // ],
    steps: [
      '· the most important thing is to shell the chickpeas. it takes approximately 20 minutes to shell 1 can of chickpeas. it elevates the hummus to the next level.',
      '· add the shelled chickpeas to a food processor or blender.',
      '· add the matcha powder, dates, and start blending.',
      '· gradually add the coconut milk until it reaches a smooth consistency.',
 
    ]
  },
  {
    id: '3',
    title: 'Papadam stack',
    description: 'Indian-mexican pizza',
    image: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1737400478/IMG_1086_xesox2.png',
    ingredients: [
      '+ black pepper flavored papadam (uncooked)',
      '+ cooked mixed rice',
      '+ shrimp',
      '+ avocado',
      '+ mango',
    ],
    sauce: [
      '+ masala seasoning',
      '+ salt and pepper',
    ],
    steps: [
      '· fold masala seasoning into warm rice, ensuring even distribution. let it cool completely',
      '· cook shrimp and season with salt, and pepper. chop into small pieces.',
      '· mash the avocado.',
      '· dice the mango, and mix with avocado, and shrimp.',
      '· bake the papadam until crispy.',
      '· lay the rice between two papadams.',
      '· top the sandwiched papadam with the mixture prepared before.',
      '· garnish with cilantro and sesame seeds.(optional)'
    ]
  }
];

const categories = ['memory', 'taste', 'graphic'];

export default function TastePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Handle body scroll lock
  useEffect(() => {
    if (selectedRecipe) {
      // Add padding right to prevent layout shift when scrollbar disappears
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
    };
  }, [selectedRecipe]);

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
        based on inspiring dining experiences across the world.<br />
      </h2>

      {/* Recipe List - Make it responsive */}
      <div className="space-y-6 md:w-1/2">
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
              <h3 className="font-semibold mb-1 flex items-center gap-1">
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

      {/* Backdrop - Show on all screen sizes */}
      {selectedRecipe && (
        <div 
          className="fixed inset-0 bg-gray-500/8 transition-all duration-300 ease-in-out z-[55]"
          onClick={() => setSelectedRecipe(null)}
        />
      )}

      {/* Drawer - Make it responsive */}
      <div 
        className={`fixed inset-0 md:inset-auto md:top-0 md:right-0 md:w-1/2 md:h-screen 
          transform transition-transform duration-300 ease-in-out z-60
          ${selectedRecipe ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {selectedRecipe && (
          <>
            {/* Solid white background overlay */}
            <div className="absolute inset-0 bg-white" />
            
            {/* Content */}
            <div className="relative h-full overflow-y-auto">
              <div className="p-8">
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 p-2 hover:text-gray-600 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="mb-8">
                  <h2 className="font-semibold mb-1">{selectedRecipe.title}</h2>
                  <p className="text-gray-600">{selectedRecipe.description}</p>
                </div>

                <div 
                  className="w-full h-24 relative mb-10"
                  style={{ 
                    backgroundImage: `url(${selectedRecipe.image})`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '100px'
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="font-semibold mb-2">Ingredients</h3>
                    <div className="space-y-2">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <p key={index} className="text-gray-600">{ingredient}</p>
                      ))}
                    </div>
                  </div>
                  
                  {selectedRecipe.sauce && selectedRecipe.sauce.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Sauce</h3>
                      <div className="space-y-2">
                        {selectedRecipe.sauce.map((item, index) => (
                          <p key={index} className="text-gray-600">{item}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Steps</h3>
                  <div className="space-y-3">
                    {selectedRecipe.steps.map((step, index) => (
                      <p key={index} className="text-gray-600">{step}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 