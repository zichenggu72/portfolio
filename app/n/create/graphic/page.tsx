"use client";
import Image from "next/image";
import ImageZoom from "../../components/ExpandingImagePreview";
import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";

type GraphicItem = {
  title: string;
  image: string;
  description: string;
  // For refrigerator and recipe: use original aspect ratio
  // Format: width/height (e.g., 3/4 means portrait, 4/3 means landscape)
  aspectRatio?: number;
};

const projects: GraphicItem[] = [
  {
    image:
      "https://res.cloudinary.com/dsu2yornu/image/upload/v1736957711/Snapseed_iidle9.jpg",
    title: "Road trip in the U.S.",
    description:
      "Using scratch paper to draw the most memorable spots from every city I've visited in the States, capturing the essence of my journeys in a way that's unique without overpaying the industrial souvenirs.",
    aspectRatio: 3 / 4, // Portrait - taller than wide
  },
  {
    image:
      "https://res.cloudinary.com/dsu2yornu/image/upload/v1736957711/IMG_5615_lc0kvq.jpg",
    title: "Stare at time",
    description:
      "Acrylic painting on canvas of glacier in Alaska. How far back in time am I staring at?",
    aspectRatio: 1, // Square
  },
  {
    image:
      "https://res.cloudinary.com/dsu2yornu/image/upload/v1736957711/IMG_8317_ezlvz0.jpg",
    title: "Personal logo",
    description: 'Letter "G" after my surname',
    aspectRatio: 1, // Square
  },
  {
    image:
      "https://res.cloudinary.com/dsu2yornu/image/upload/v1770708400/IMG_0001_nwewk2.jpg",
    title: "Illustrated recipe",
    description: "the perfect soft-boiled egg",
    aspectRatio: 3 / 4, // Portrait - taller than wide
  },
  {
    image:
      "https://res.cloudinary.com/dsu2yornu/image/upload/v1736957715/IMG_1877_f1titx.jpg",
    title: "Broken plate",
    description:
      "When I opened the delivery of my long-awaited plate, only to find it broken. I decided to turn it into a canvas.",
    aspectRatio: 1, // Square
  },
  {
    image: "/pic/diary.png",
    title: "Visual diary",
    description:
      "A handmade journal with colorful illustrations on textured paper",
    aspectRatio: 3 / 4, // Portrait
  },
  {
    image: "/pic/human.png",
    title: "Human and Saguaro",
    description:
      "Acrylic painting on circular canvas depicting desert life with saguaro cacti",
    aspectRatio: 1, // Square
  },
];

// Organic scattered positions with subtle rotations (scaled down 20%)
const generatePositions = () => {
  // Free-form layout - matching reference image positions
  const positions: {
    x: number;
    y: number;
    rotation: number;
    zIndex: number;
  }[] = [
    { x: 24, y: 48, rotation: -4, zIndex: 3 }, // Road trip (tall, far left)
    { x: 216, y: 0, rotation: 5, zIndex: 2 }, // Stare at time (upper left-center)
    { x: 400, y: 40, rotation: -3, zIndex: 4 }, // Personal logo (upper right-center, staggered)
    { x: 510, y: 254, rotation: -4, zIndex: 5 }, // Illustrated recipe (tall, lower right)
    { x: 96, y: 288, rotation: -5, zIndex: 7 }, // Broken plate (lower left)
    { x: 296, y: 240, rotation: 5, zIndex: 6 }, // Visual diary (tall, lower center)
    { x: 610, y: 46, rotation: 2, zIndex: 8 }, // Human and Saguaro (far right)
  ];

  return { positions, height: 600 };
};

// Draggable card component
const DraggableCard = ({
  item,
  initialPosition,
  index,
  onDragStart,
  onImageClick,
}: {
  item: GraphicItem;
  initialPosition: { x: number; y: number; rotation: number; zIndex: number };
  index: number;
  onDragStart: () => number;
  onImageClick: (rect: DOMRect, rotation: number) => void;
}) => {
  const [zIndex, setZIndex] = useState(initialPosition.zIndex);
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    setIsDragging(true);
    const newZ = onDragStart();
    setZIndex(newZ);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      onImageClick(rect, initialPosition.rotation);
    }
  };

  // Calculate dimensions based on aspect ratio (scaled down 20%)
  const baseWidth = 150;
  const imageHeight = item.aspectRatio
    ? Math.round(baseWidth / item.aspectRatio)
    : 98; // Default square-ish height
  const cardWidth = baseWidth + 10; // Add padding

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        left: initialPosition.x,
        top: initialPosition.y,
        zIndex: zIndex,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: initialPosition.rotation }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: isDragging ? 0 : initialPosition.rotation,
      }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{
        scale: 1.05,
        rotate:
          initialPosition.rotation - Math.sign(initialPosition.rotation) * 5,
      }}
      whileDrag={{ scale: 1.08, rotate: 0 }}
    >
      <div
        onClick={handleClick}
        className="bg-white dark:bg-white rounded-[8px] p-[6px]"
        style={{
          width: cardWidth,
          boxShadow: isDragging
            ? "0 1px 3px rgba(0,0,0,0.08), 0 6px 16px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.06)"
            : "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04), 0 20px 40px rgba(0,0,0,0.06)",
        }}
      >
        {/* Image area */}
        <div
          ref={imageRef}
          className="bg-[#d9d9d9] rounded-[8px] overflow-hidden"
          style={{
            width: baseWidth,
            height: imageHeight,
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            width={baseWidth}
            height={imageHeight}
            className="object-cover w-full h-full"
            draggable={false}
          />
        </div>
        {/* Title area */}
        <p className="mt-1.5 text-[12px] leading-tight text-[#1f2937] font-normal truncate px-0.5">
          {item.title}
        </p>
      </div>
    </motion.div>
  );
};

export default function GraphicPage() {
  const [highestZ, setHighestZ] = useState(projects.length);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    sourceRect: DOMRect;
    rotation: number;
  } | null>(null);

  const { positions, height } = useMemo(() => generatePositions(), []);

  const handleDragStart = () => {
    const newZ = highestZ + 1;
    setHighestZ(newZ);
    return newZ;
  };

  const handleImageClick = (item: GraphicItem, rect: DOMRect, rotation: number) => {
    setSelectedImage({
      src: item.image,
      alt: item.title,
      sourceRect: rect,
      rotation,
    });
  };

  return (
    <>
      {/* Scattered cards */}
      <motion.div
        className="relative"
        style={{ height }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {projects.map((item, index) => (
          <DraggableCard
            key={index}
            item={item}
            initialPosition={positions[index]}
            index={index}
            onDragStart={handleDragStart}
            onImageClick={(rect, rotation) => handleImageClick(item, rect, rotation)}
          />
        ))}
      </motion.div>

      {/* Image Zoom */}
      <ImageZoom
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        image={selectedImage || { src: "", alt: "" }}
        sourceRect={selectedImage?.sourceRect || null}
        sourceRotation={selectedImage?.rotation}
      />
    </>
  );
}
