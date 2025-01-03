import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ImagePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: any; alt: string }[];
  currentImageIndex: number;
}

export default function ImagePreview({ isOpen, onClose, images, currentImageIndex }: ImagePreviewProps) {
  const [activeIndex, setActiveIndex] = useState(currentImageIndex);

  // Reset active index when modal opens
  useEffect(() => {
    setActiveIndex(currentImageIndex);
  }, [currentImageIndex]);

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const showPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrevious();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className="relative max-w-[90vw] max-h-[90vh]">
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white hover:text-gray-300"
          >
            Close
          </button>
          
          <div className="relative w-[80vw] h-[80vh]">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="object-contain w-full h-full"
              fill
              sizes="90vw"
              priority
              quality={100}
            />

            {/* Navigation arrows */}
            <button
              onClick={showPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              aria-label="Next image"
            >
              →
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 