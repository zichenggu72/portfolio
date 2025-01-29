'use client';
import { useState } from 'react';

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
    { title: 'read.cv', description: 'design, art, eng, tech community with eye opening posts', date: 'Jan 25', url: 'https://read.cv/explore', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'design systems libraries', description: 'the all-in-one design system libraries that i am truly grateful for', date: 'Jan 25', url: 'https://designsystems.surf/design-systems', hoverColor: 'hover:text-[#F8961E]' },
    { title: 'shadcn/ui', description: 'one of the best component library', date: 'Jan 25', url: 'https://ui.shadcn.com/', hoverColor: 'hover:text-[#90BE6D]' },
    { title: 'cosmos', description: 'a discovery engine', date: 'Jan 25', url: 'https://www.cosmos.so/discover', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'books about food', description: 'people live in food, design, art intersection', date: 'Jan 25', url: 'https://www.booksabout.food/people', hoverColor: 'hover:text-[#90BE6D]' },
    { title: 'curated.design', description: 'web design catalog', date: 'Jan 25', url: 'https://www.curated.design/', hoverColor: 'hover:text-[#F8961E]' },
    { title: 'featured type', description: 'typefaces collection', date: 'Jan 25', url: 'https://www.featuredtype.com/typefaces', hoverColor: 'hover:text-[#4D908E]' },
  
  ],

  creatives: [
    // Add your creative items here
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
    { title: 'Magnum Photos', description: '', date: 'Dec 24', url: 'https://www.magnumphotos.com/', hoverColor: 'hover:text-[#F9C74F]' },
    { title: 'Saul Leiter', description: '', date: 'Dec 24', url: 'https://www.saulleiterfoundation.org/', hoverColor: 'hover:text-[#4D908E]' },
    { title: 'Sam Youkilis', description: '', date: 'Dec 24', url: 'https://www.instagram.com/samyoukilis/?hl=en', hoverColor: 'hover:text-[#FF5D1F]' },
    { title: 'Hiroshi Sugimoto', description: '', date: 'Dec 24', url: 'https://www.sugimotohiroshi.com/site-specific-arts', hoverColor: 'hover:text-[#90BE6D]' },
    { title: 'Rinko Kawauchi', description: '', date: 'Dec 24', url: 'https://rinkokawauchi.com/en/', hoverColor: 'hover:text-[#F9C74F]' },
    { title: 'Man Ray', description: '', date: 'Dec 24', url: 'https://www.manray.net/', hoverColor: 'hover:text-[#4D908E]' },
    { title: 'Duane Michals', description: '', date: 'Dec 24', url: 'https://www.dcmooregallery.com/artists/duane-michals?view=slider', hoverColor: 'hover:text-[#90BE6D]' },
    { title: 'Michael Wesely', description: '', date: 'Dec 24', url: 'https://wesely.org/', hoverColor: 'hover:text-[#F9C74F]' },
  ],
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('inspirations');

  return (
    <div className="main">
      <h1 className="font-semibold mb-6">Resources</h1>
      <div className="flex gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`text-sm px-3 py-1 rounded-md text-gray-400 hover:text-gray-600 ${
              activeCategory === category ? 'bg-gray-100 text-gray-700' : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content section based on active category */}
      <div className="mt-6 space-y-2">
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
      </div>
    </div>
  );
} 