import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';

interface ImagePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: any; alt: string }[];
  currentImageIndex: number;
}

export default function ImagePreview({ isOpen, onClose, images, currentImageIndex }: ImagePreviewProps) {
  const [activeIndex, setActiveIndex] = useState(currentImageIndex);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isOutsideImage, setIsOutsideImage] = useState(true);
  const [imageBounds, setImageBounds] = useState<DOMRect | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset active index when modal opens
  useEffect(() => {
    setActiveIndex(currentImageIndex);
  }, [currentImageIndex]);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const showPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Calculate actual rendered image bounds within the container
  const updateImageBounds = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const img = imageRef.current;
    const naturalWidth = img.naturalWidth || 1;
    const naturalHeight = img.naturalHeight || 1;
    const imageAspect = naturalWidth / naturalHeight;
    const containerAspect = container.width / container.height;

    let renderWidth: number;
    let renderHeight: number;

    if (imageAspect > containerAspect) {
      // Image is wider - constrained by width
      renderWidth = container.width;
      renderHeight = container.width / imageAspect;
    } else {
      // Image is taller - constrained by height
      renderHeight = container.height;
      renderWidth = container.height * imageAspect;
    }

    const offsetX = (container.width - renderWidth) / 2;
    const offsetY = (container.height - renderHeight) / 2;

    setImageBounds(new DOMRect(
      container.left + offsetX,
      container.top + offsetY,
      renderWidth,
      renderHeight
    ));
  }, []);

  // Update bounds when image loads or changes
  useEffect(() => {
    updateImageBounds();
    window.addEventListener('resize', updateImageBounds);
    return () => window.removeEventListener('resize', updateImageBounds);
  }, [activeIndex, updateImageBounds]);

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
  }, [isOpen, onClose, showNext, showPrevious]);

  // Check if point is inside the actual rendered image
  const isInsideImage = useCallback((x: number, y: number): boolean => {
    if (!imageBounds) return false;
    return (
      x >= imageBounds.left &&
      x <= imageBounds.right &&
      y >= imageBounds.top &&
      y <= imageBounds.bottom
    );
  }, [imageBounds]);

  // Track mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setIsOutsideImage(!isInsideImage(e.clientX, e.clientY));
  };

  // Click anywhere outside the image closes the modal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!isInsideImage(e.clientX, e.clientY)) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onClick={handleOverlayClick}
        style={{ cursor: isOutsideImage ? 'none' : 'default' }}
      >
        {/* Floating close text that follows cursor */}
        {isOutsideImage && (
          <div
            className="fixed pointer-events-none z-[60] text-white text-sm font-medium"
            style={{
              left: cursorPos.x + 12,
              top: cursorPos.y + 12,
            }}
          >
            close
          </div>
        )}

        <Dialog.Panel className="relative max-w-[90vw] max-h-[90vh]">
          <div
            ref={containerRef}
            className="relative w-[80vw] h-[80vh]"
            onClick={handleOverlayClick}
          >
            <Image
              ref={imageRef}
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="object-contain w-full h-full"
              fill
              sizes="90vw"
              priority
              quality={100}
              onLoad={updateImageBounds}
            />

            {/* Navigation arrows - stop propagation so clicks don't close */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              aria-label="Next image"
            >
              →
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full pointer-events-none">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 