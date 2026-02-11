'use client';
import SharedHeader from "../../components/SharedHeader";
import MainTabs from "../../components/MainTabs";
import { motion } from 'framer-motion';
import Image from 'next/image';

type ResourceItem = {
  title: string;
  url: string;
  image?: string;
};

// Inspiration items with screenshot previews
const allItems: ResourceItem[] = [
  { title: 'sidebar', url: 'https://sidebar.io/', image: '/pic/inspirations/sidebar.png' },
  { title: 'the pudding', url: 'https://pudding.cool/', image: '/pic/inspirations/the-pudding.png' },
  { title: 'design systems', url: 'https://designsystems.surf/design-systems', image: '/pic/inspirations/design-systems.png' },
  { title: 'shadcn/ui', url: 'https://ui.shadcn.com/', image: '/pic/inspirations/shadcn-ui.png' },
  { title: 'cosmos', url: 'https://www.cosmos.so/discover', image: '/pic/inspirations/cosmos.png' },
  { title: 'books about food', url: 'https://www.booksabout.food/people', image: '/pic/inspirations/books-about-food.png' },
  { title: 'curated.design', url: 'https://www.curated.design/', image: '/pic/inspirations/curated-design.png' },
  { title: 'featured type', url: 'https://www.featuredtype.com/typefaces', image: '/pic/inspirations/featured-type.png' },
  { title: 'dive club', url: 'https://www.dive.club/', image: '/pic/inspirations/dive-club.png' },
  { title: 'window swap', url: 'https://www.window-swap.com/', image: '/pic/inspirations/window-swap.png' },
  { title: 'fancy components', url: 'https://www.fancycomponents.dev/docs/components/text/letter-swap', image: '/pic/inspirations/fancy-components.png' },
  { title: 'headless ui', url: 'https://headlessui.com/', image: '/pic/inspirations/headless-ui.png' },
  { title: 'design spells', url: 'https://www.designspells.com/', image: '/pic/inspirations/design-spells.png' },
  { title: 'hyperframer', url: 'https://www.hyperframer.com/', image: '/pic/inspirations/hyperframer.png' },
];

// Card component
const InspirationCard = ({
  item,
  index,
}: {
  item: ResourceItem;
  index: number;
}) => {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
    >
      <div
        className="bg-white dark:bg-white rounded-[8px] p-[6px]"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04), 0 20px 40px rgba(0,0,0,0.06)'
        }}
      >
        {/* Image area */}
        <div className="w-full aspect-[188/123] bg-[#d9d9d9] rounded-[8px] overflow-hidden">
          {item.image && (
            <Image
              src={item.image}
              alt={item.title}
              width={376}
              height={246}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        {/* Title area */}
        <p className="mt-1.5 text-[12px] leading-tight text-[#1f2937] font-normal truncate px-0.5">
          {item.title}
        </p>
      </div>
    </motion.a>
  );
};

export default function InspirationsPage() {
  return (
    <div>
      <SharedHeader />
      <MainTabs />

      {/* Grid layout - 4 columns */}
      <motion.div
        className="mt-space-400 grid grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {allItems.map((item, index) => (
          <InspirationCard
            key={index}
            item={item}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}
