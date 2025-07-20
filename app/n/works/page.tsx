// app/works/page.tsx
'use client';
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import sale4 from "../../assets/images/hero11.jpg";
import service4 from "../../assets/images/hero33.jpg";
import task4 from "../../assets/images/hero22.jpg";

export default function WorksPage() {
  const [selectedWork, setSelectedWork] = useState<{
    images: { src: any; alt: string }[];
    index: number;
  } | null>(null);
  
  const works = [
    {
      id: "sales",
      dateRange: "2024",
      title: "B2B SaaS - Sales tool",
      description: "Conversation Intelligence to Sales Success",
      details: "As the founding designer, I shaped the entire user experience. Build a cohesive product that empower sales teams and product marketing managers.",
      projectUrl: "#",
      images: [
        { src: sale4, alt: "Proponent Example 1" },
      
      ]
    },
    {
      id: "integration",
      dateRange: "2023",
      title: "B2B SaaS",
      description: "Unified workflow to augment cloud capabilities",
      details: "To support the new business requirement (license to subscription mode transition), I designed a cloud service integration strategy that reduce the time-to-value.",
      projectUrl: "#",
      images: [
        { src: task4, alt: "VMware Cloud Service Integration Example 1" },
      ]
    },
    {
      id: "monitor",
      dateRange: "2023",
      title: "Design System",
      description: "Uncover a hidden behavior to facilitate task monitoring",
      details: "Designed phased solutions for VMware's core task monitoring system, a critical component used across products by millions of users. The strategy balanced quick implementation needs with long-term scalability.",
      projectUrl: "#",
      images: [
        { src: service4, alt: "VMware Cloud Task Monitor Example 1" },
 
      ]
    },
  ];

  return (
    <div className="space-y-12">
      
      <div className="space-y-20 leading-relaxed">
        {works.map((work, index) => (
          <div key={index}>
            {/* Images Grid */}
            <div className="mb-4">
              {work.images.map((image, imageIndex) => (
                <Link 
                  key={imageIndex}
                  href={`/n/works/${work.id}`}
                  className="group block rounded-lg overflow-hidden"
                >
                  <div 
                    className="w-[616px] aspect-video relative cursor-pointer"
                    onClick={() => setSelectedWork({ images: work.images, index: imageIndex })}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="616px"
                      priority={imageIndex === 0}
                      className="object-cover rounded-lg border border-gray-100 transition-transform duration-300 group-hover:scale-102"
                    />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mb-4">
              {/* Title and Date row */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <Link 
                    href={`/n/works/${work.id}`}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {work.title}
                  </Link>
                </div>
                <span className="text-sm text-gray-500">{work.dateRange}</span>
              </div>
              
              {/* Description */}
              <Link 
                href={`/n/works/${work.id}`}
                className="block"
              >
                <p className={`font-semibold mb-2 inline-flex items-center transition-colors duration-200
                  ${work.id === 'sales' ? 'hover:text-[#F8961E]' : ''}
                  ${work.id === 'integration' ? 'hover:text-[#A7A622]' : ''}
                  ${work.id === 'monitor' ? 'hover:text-[#59829E]' : ''}`}
                >
                  {work.description}
                </p>
              </Link>
              
              {/* Details paragraph */}
              <p className="text-gray-600 mb-2">{work.details}</p>
            </div>
          </div>
        ))}
      </div>
{/* 
      {selectedWork !== null && (
        <ImagePreview
          isOpen={selectedWork !== null}
          onClose={() => setSelectedWork(null)}
          images={selectedWork.images}
          currentImageIndex={selectedWork.index}
        />
      )} */}
    </div>
  );
}