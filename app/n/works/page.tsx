// app/works/page.tsx
'use client';
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import work1 from "../../assets/images/work1.jpg";
import work2 from "../../assets/images/work2.jpg";
import work3 from "../../assets/images/work3.jpg";
import work4 from "../../assets/images/work4.jpg";
import work5 from "../../assets/images/work5.jpg";
import work6 from "../../assets/images/work6.jpg";
import work7 from "../../assets/images/work7.jpg";
import work8 from "../../assets/images/work8.jpg";
import ImagePreview from "../components/ImagePreview";

export default function WorksPage() {
  const [selectedWork, setSelectedWork] = useState<{
    images: { src: any; alt: string }[];
    index: number;
  } | null>(null);

  const works = [
    {
      dateRange: "2024",
      title: "Proponent app 0 to 1",
      description: "Revolutionizing sales enablement through AI",
      details: "From customer journey, information architecture, interaction flows, and visual design, I shaped the entire user experience as a founding designer. Build a cohesive product that empower sales teams and product marketing managers, together with the PM and Eng.",
      projectUrl: "#",
      images: [
        { src: work1, alt: "Proponent Example 1" },
        { src: work2, alt: "Proponent Example 2" },
      ]
    },
    {
      dateRange: "2023",
      title: "VMware Cloud Service Integration",
      description: "Unified workflow to augment cloud capabilities",
      details: "To support the new business requirement (license to subscription mode transition), I designed a cloud service integration strategy that reduce the time-to-value.",
      projectUrl: "#",
      images: [
        { src: work3, alt: "VMware Cloud Service Integration Example 1" },
        { src: work4, alt: "VMware Cloud Service Integration Example 2" },
      ]
    },
    {
      dateRange: "2023",
      title: "VMware Cloud Task Monitor",
      description: "Uncover a hidden behavior to facilitate task monitoring",
      details: "Designed phased solutions for VMware's core task monitoring system, a critical component used across products by millions of users. The strategy balanced quick implementation needs with long-term scalability.",
      projectUrl: "#",
      images: [
        { src: work5, alt: "VMware Cloud Task Monitor Example 1" },
        { src: work6, alt: "VMware Cloud Task Monitor Example 2" },
      ]
    },
    {
      dateRange: "2021",
      title: "Securonix Policy Creation",
      description: "Streamline the process of building tailored policies",
      details: "Identified key bottlenecks in the policy creation workflow through in-depth user research, and implemented a practical and innovative solution in a cohesive manner.",
      projectUrl: "#",
      images: [
        { src: work1, alt: "Securonix Policy Creation Example 1" },
        { src: work2, alt: "Securonix Policy Creation Example 2" },
      ]
    }
  ];

  return (
    <div className="space-y-16">
      <h1 className="font-semibold mb-6">Works</h1>
      
      {works.map((work, index) => (
        <div key={index}>
          <div className="mb-4">
            {/* Title and Date row */}
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">
                  {work.title}
                  {work.projectUrl && (
                    <Link href={work.projectUrl} className="text-gray-500 inline-flex items-center ml-1">
                      ↗
                    </Link>
                  )}
                </span>
              </div>
              <span className="text-sm text-gray-500">{work.dateRange}</span>
            </div>
            
            {/* Description */}
            <p className="font-semibold">{work.description}</p>
            
            {/* New Details paragraph */}
            <p className="text-gray-600 mb-6">{work.details}</p>

            {/* Images */}
            <div className="mt-4 flex gap-8">
              {work.images.map((image, imageIndex) => (
                <div 
                  key={imageIndex}
                  className="w-[334px] aspect-video relative cursor-pointer"
                  onClick={() => setSelectedWork({ images: work.images, index: imageIndex })}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={imageIndex === 0}
                    className="object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {selectedWork !== null && (
        <ImagePreview
          isOpen={selectedWork !== null}
          onClose={() => setSelectedWork(null)}
          images={selectedWork.images}
          currentImageIndex={selectedWork.index}
        />
      )}
    </div>
  );
}

