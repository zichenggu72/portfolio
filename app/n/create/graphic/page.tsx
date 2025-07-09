'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import ImagePreview from '../../components/ImagePreview';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['memory', 'taste', 'graphic'];

export default function GraphicPage() {
  const pathname = usePathname();
  const [selectedImage, setSelectedImage] = useState<{ images: { src: string; alt: string; }[]; index: number } | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(2); // graphic is index 2

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
      {/* Navigation */}
      <h1 className="font-semibold mb-6">Create</h1>
      
      {/* Animated Tab Navigation */}
      <div className="relative mb-8">
        <div className="flex gap-2">
          {categories.map((category, index) => (
            <Link 
              key={category}
              href={category === 'memory' ? '/n/create' : `/n/create/${category}`}
              onClick={() => handleTabClick(index, category)}
              className={`relative text-sm px-3 py-1 rounded-md transition-all duration-200 hover:text-gray-600 ${
                (category === 'memory' && pathname === '/n/create') ||
                pathname === `/n/create/${category}`
                  ? 'text-gray-700'
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
            {/* Project Content */}
            <div className="space-y-8">
              {/* Project 1 */}
              <div className="flex gap-8">
                <div className="w-1/4">
                  <div 
                    className="relative aspect-[4/4] overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage({ 
                      images: [{ 
                        src: "https://res.cloudinary.com/dsu2yornu/image/upload/v1736957711/Snapseed_iidle9.jpg", 
                        alt: "Refrigerator magnet project" 
                      }], 
                      index: 0 
                    })}
                  >
                    <Image
                      src="https://res.cloudinary.com/dsu2yornu/image/upload/v1736957711/Snapseed_iidle9.jpg"
                      alt="Refrigerator magnet project"
                      fill
                      className="object-cover rounded-lg hover:opacity-90 transition-opacity"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="w-2/3">
                  <h3 className="font-medium mb-1">Reimagine the refrigerator magnet</h3>
                  <p className="text-gray-600">
                    Using scratch paper to draw the most memorable spots from every city I've visited in the States, 
                    capturing the essence of my journeys in a way that's unique without overpaying the industrial souvenirs.
                  </p>
                </div>
              </div>

              {/* Project 2 */}
              <div className="flex gap-8">
                <div className="w-1/4">
                  <div 
                    className="relative aspect-[4/4] overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage({ 
                      images: [{ 
                        src: "https://res.cloudinary.com/dsu2yornu/image/upload/v1736957711/IMG_5615_lc0kvq.jpg", 
                        alt: "Staring at time" 
                      }], 
                      index: 0 
                    })}
                  >
                    <Image
                      src="https://res.cloudinary.com/dsu2yornu/image/upload/v1736957711/IMG_5615_lc0kvq.jpg"
                      alt="Staring at time"
                      fill
                      className="object-cover rounded-lg hover:opacity-90 transition-opacity"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="w-2/3">
                  <h3 className="font-medium mb-1">Stare at time</h3>
                  <p className="text-gray-600">
                    Acrylic painting on canvas of glacier in Alaska. How far back in time am I staring at?
                  </p>
                </div>
              </div>

              {/* Project 3 */}
              <div className="flex gap-8">
                <div className="w-1/4">
                  <div 
                    className="relative aspect-[4/4] overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage({ 
                      images: [{ 
                        src: "https://res.cloudinary.com/dsu2yornu/image/upload/v1736957711/IMG_8317_ezlvz0.jpg", 
                        alt: "Personal logo" 
                      }], 
                      index: 0 
                    })}
                  >
                    <Image
                      src="https://res.cloudinary.com/dsu2yornu/image/upload/v1736957711/IMG_8317_ezlvz0.jpg"
                      alt="Personal logo"
                      fill
                      className="object-cover rounded-lg hover:opacity-90 transition-opacity"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="w-2/3">
                  <h3 className="font-medium mb-1">Personal logo</h3>
                  <p className="text-gray-600">
                    Letter "G" after my surname
                  </p>
                </div>
              </div>

              {/* Project 4 */}
              <div className="flex gap-8">
                <div className="w-1/4">
                  <div 
                    className="relative aspect-[4/4] overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage({ 
                      images: [{ 
                        src: "https://res.cloudinary.com/dsu2yornu/image/upload/v1736957715/IMG_1877_f1titx.jpg", 
                        alt: "Broken plate" 
                      }], 
                      index: 0 
                    })}
                  >
                    <Image
                      src="https://res.cloudinary.com/dsu2yornu/image/upload/v1736957715/IMG_1877_f1titx.jpg"
                      alt="Broken plate"
                      fill
                      className="object-cover rounded-lg hover:opacity-90 transition-opacity"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="w-2/3">
                  <h3 className="font-medium mb-1">Broken plate</h3>
                  <p className="text-gray-600">
                  When I opened the delivery of my long-awaited plate, only to find it broken. I decided to turn it into a canvas.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Preview Modal */}
      {selectedImage !== null && (
        <ImagePreview
          isOpen={selectedImage !== null}
          onClose={() => setSelectedImage(null)}
          images={selectedImage.images}
          currentImageIndex={selectedImage.index}
        />
      )}
    </div>
  );
}