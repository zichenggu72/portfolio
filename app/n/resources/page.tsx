'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// You can customize these data structures later with your own content
type ResourceItem = {
  title: string;
  description?: string;
  date: string;
  url: string;
  hoverColor?: string;
};

const categories = ['inspirations', 'creatives', 'photography'];

// Example data structure - you can replace these with your actual content
const resourcesData: Record<string, ResourceItem[]> = {
  inspirations: [
    // Add your inspiration items here
    { title: 'sidebar', description: 'the five best design links, every workday', date: 'Jan 25', url: 'https://sidebar.io/', hoverColor: 'hover:text-[#90BE6D]' },
    { title: 'the pudding', description: 'a digital publication that explain ideas with visual essays', date: 'Jul 25', url: 'https://pudding.cool/', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'design systems libraries', description: 'the all-in-one design system libraries that i am truly grateful for', date: 'Jan 25', url: 'https://designsystems.surf/design-systems', hoverColor: 'hover:text-[#F8961E]' },
    { title: 'shadcn/ui', description: 'one of the best component library', date: 'Jan 25', url: 'https://ui.shadcn.com/', hoverColor: 'hover:text-[#90BE6D]' },
    { title: 'cosmos', description: 'a discovery engine', date: 'Jan 25', url: 'https://www.cosmos.so/discover', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'books about food', description: 'people live in food, design, art intersection', date: 'Jan 25', url: 'https://www.booksabout.food/people', hoverColor: 'hover:text-[#90BE6D]' },
    { title: 'curated.design', description: 'web design catalog', date: 'Jan 25', url: 'https://www.curated.design/', hoverColor: 'hover:text-[#F8961E]' },
    { title: 'featured type', description: 'typefaces collection', date: 'Jan 25', url: 'https://www.featuredtype.com/typefaces', hoverColor: 'hover:text-[#4D908E]' },
    { title: 'dive club', description: 'where designers never stop learning', date: 'Jan 25', url: 'https://www.dive.club/', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'window swap', description: 'open a window somewhere in the world', date: 'Jul 25', url: 'https://www.window-swap.com/', hoverColor: 'hover:text-[#FF5D1F]' },

  ],

  creatives: [
    // Add your creative items here
    { title: 'Ryo Lu', description: '', date: 'Feb 25', url: 'https://ryo.lu/', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'Brain Lovin', description: '', date: 'Jan 25', url: 'https://brianlovin.com/', hoverColor: 'hover:text-[#90BE6D]' },
    { title: 'Valentino Borghesi', description: '', date: 'Jan 25', url: 'https://valentinoborghesi.is/', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'Victor Pontis', description: '', date: 'Jan 25', url: 'https://pont.is/', hoverColor: 'hover:text-[#F9C74F]' },
    { title: 'Spaces', description: '', date: 'Jan 25', url: 'https://spaces.is/loversmagazine/interviews', hoverColor: 'hover:text-[#F8961E]' },
    { title: 'Seungmee Lee', description: '', date: 'Jan 25', url: 'https://www.seungmee-lee.com/', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'SJ Zhang', description: '', date: 'Dec 24', url: 'https://www.sj.land/', hoverColor: 'hover:text-[#4D908E]' },
    { title: 'Mariana Castilho', description: '', date: 'Nov 24', url: 'https://www.uilabs.dev/', hoverColor: 'hover:text-[#F9C74F]' },
    { title: 'Cassandra Tang', description: '', date: 'Nov 24', url: 'https://www.cassandratang.com/', hoverColor: 'hover:text-[#F8961E]' },
    { title: 'Robin Spielmann', description: '', date: 'Nov 24', url: 'https://www.iamrob.in/', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'Sam Peitz', description: '', date: 'Nov 24', url: 'https://www.sam-peitz.com/', hoverColor: 'hover:text-[#4D908E]' },
    { title: 'Justin Jay Wang', description: '', date: 'Nov 24', url: 'https://justinjay.wang/', hoverColor: 'hover:text-[#90BE6D]' },

    
  ],
  photography: [
    // Add your photography items here
    { title: 'Lee Miller', description: '', date: 'Feb 25', url: 'https://www.instagram.com/leemillerarchives/?hl=en', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'Magnum Photos', description: '', date: 'Dec 24', url: 'https://www.magnumphotos.com/', hoverColor: 'hover:text-[#F9C74F]' },
    { title: 'Saul Leiter', description: '', date: 'Dec 24', url: 'https://www.saulleiterfoundation.org/', hoverColor: 'hover:text-[#4D908E]' },
    { title: 'Sam Youkilis', description: '', date: 'Dec 24', url: 'https://www.instagram.com/samyoukilis/?hl=en', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'Hiroshi Sugimoto', description: '', date: 'Dec 24', url: 'https://www.sugimotohiroshi.com/site-specific-arts', hoverColor: 'hover:text-[#90BE6D]' },
    { title: 'Rinko Kawauchi', description: '', date: 'Dec 24', url: 'https://rinkokawauchi.com/en/', hoverColor: 'hover:text-[#F9C74F]' },
    { title: 'Man Ray', description: '', date: 'Dec 24', url: 'https://www.manray.net/', hoverColor: 'hover:text-[#4D908E]' },
    { title: 'Duane Michals', description: '', date: 'Dec 24', url: 'https://www.dcmooregallery.com/artists/duane-michals?view=slider', hoverColor: 'hover:text-[#90BE6D]' },
    { title: 'Michael Wesely', description: '', date: 'Dec 24', url: 'https://wesely.org/', hoverColor: 'hover:text-[#F9C74F]' },
    { title: 'Cindy Sherman', description: '', date: 'Jan 25', url: 'https://www.moma.org/artists/5392-cindy-sherman', hoverColor: 'hover:text-[#4D908E]' },
  ],
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('inspirations');
  const [direction, setDirection] = useState<number>(0);

  const handleTabClick = (category: string) => {
    const currentIndex = categories.indexOf(activeCategory);
    const newIndex = categories.indexOf(category);
    const newDirection = newIndex > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setActiveCategory(category);
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
      
      {/* Animated Tab Navigation */}
      <div className="relative mb-6">
        <div className="border-1 border-gray-200 rounded-[8px] p-0.5 inline-block bg-white">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleTabClick(category)}
                className={`relative text-sm px-3 py-1 rounded-md transition-all duration-200 hover:text-gray-600 ${
                  activeCategory === category
                    ? 'text-gray-900'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {/* Animated background */}
                {activeCategory === category && (
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
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Content Area */}
      <div className="relative">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={activeCategory}
            custom={direction}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mt-6 space-y-2"
          >
            {resourcesData[activeCategory]?.map((item, index) => (
              <div 
                key={index} 
                className={`flex justify-between items-start ${
                  item.description ? 'pb-4' : 'pb-2'
                }`}
              >
                <div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`font-regular transition-colors ${item.hoverColor || 'hover:text-gray-600'}`}
                  >
                    {item.title}
                  </a>
                  {item.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="text-sm text-gray-400 ml-4">
                  {item.date}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}