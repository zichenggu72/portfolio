'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import ImagePreview from '../../components/ImagePreview';
import { useState } from 'react';

const categories = ['memory', 'taste', 'graphic'];

export default function GraphicPage() {
  const pathname = usePathname();
  const [selectedImage, setSelectedImage] = useState<{ images: { src: string; alt: string; }[]; index: number } | null>(null);

  const projectImage = {
    src: "https://res.cloudinary.com/dsu2yornu/image/upload/v1736034383/DSC00472_bmbbd2.jpg",
    alt: "Project image"
  };

  return (
    <div className="main">
      {/* Navigation */}
      <h1 className="font-semibold mb-6">Create</h1>
      <div className="flex gap-4 mb-16">
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

      {/* Project Content */}
      <article className="space-y-4">
        {/* Organization and Year
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">University of the Arts London</span>
          <span className="text-sm text-gray-500">2024</span>
        </div> */}
        
        {/* Title */}
        <p className="font-semibold mb-2 -mt-8">Reimagine refrigerator magnet</p>
        
        {/* Description */}
        <div className="space-y-4">
          <p className="text-gray-600">
            Using scratch paper to draw the most memorable spots from every city I've visited in the States, 
            capturing the essence of my journeys in a way that's unique without overpaying the industrial souvenirs.
          </p>
        </div>

        {/* Single Image */}
        <div className="max-w-[50%] mt-6">
          <div 
            className="aspect-[4/3] relative cursor-pointer"
            onClick={() => setSelectedImage({ images: [projectImage], index: 0 })}
          >
            <Image
              src={projectImage.src}
              alt={projectImage.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              priority
              className="object-cover rounded-lg hover:opacity-90 transition-opacity"
            />
          </div>
        </div>
      </article>

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