'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
    image: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747859696/Frame_1_gmlvha.png',
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
    image: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747859696/Frame_2_yth2ch.png',
    ingredients: [
      '+ Match powder',
      '+ coconut milk',
      '+ dates, pitted and soaked',
      '+ canned chickpeas',
    ],
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
    image: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747859696/Frame_3_vac19z.png',
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
  },
  {
    id: '4',
    title: 'Salty biscuit',
    description: 'Serbian inspired biscuit',
    image: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1747861956/Frame_4_b1iz5u.png',
    ingredients: [
      '+ 50g wheat flour',
      '+ 40g mixed healthier flours (oat, quinoa, and chickpea flour etc)',
      '+ 20g butter',
      '+ 10g tahini',
      '+ 5g milk/coconut powder',
      '+ 5g chia seeds',
      '+ 3g salt',
      '+ 30~50ml preferred milk',
      '+ pinch of baking powder'
    ],
    sauce: [
      '+ masala seasoning (optional)',
      '+ cardamom powder (optional)',
    ],
    steps: [
      '· in a large bowl, whisk together all dry ingredients.',
      '· add slightly softened butter and tahini, use fingers to rub them into the flour mixture until it resembles coarse breadcrumbs.',
      '· add just enough preferred milk (start with 15-20g) to bring the dough together - stop when it just forms a cohesive ball.',
      '· divide the dough and flatten it as thin biscuit.',
    ]
  },
];

const categories = ['memory', 'taste', 'graphic'];

export default function TastePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(1); // taste is index 1

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
    const newDirection = index > activeTab ? -1 : 1;
    setDirection(newDirection);
  };

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

  const contentVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -50 : 50
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
      x: direction > 0 ? 50 : -50,
      transition: {
        opacity: { duration: 0.15, ease: "easeIn" as const },
        x: { duration: 0.2, ease: "easeIn" as const }
      }
    })
  };

  return (
    <div className="main">
      
      {/* Animated Tab Navigation */}
      <div className="relative mb-6">
      <div className="border-1 border-gray-200 rounded-[8px] p-0.5 inline-block bg-white">

        <div className="flex gap-2">
          {categories.map((category, index) => (
            <Link 
              key={category}
              href={category === 'memory' ? '/n/create' : `/n/create/${category}`}
              onClick={() => handleTabClick(index, category)}
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
          >
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
                  className="group transition-transform duration-200 ease-in-out hover:translate-x-1 cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-[100px] h-[100px] bg-gray-100 flex-shrink-0">
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
                      <h3 className="font-semibold mb-1 flex items-center gap-3">
                        {recipe.title}
                        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </h3>
                      <p className="text-gray-600">{recipe.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
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