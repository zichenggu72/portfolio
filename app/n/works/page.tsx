// app/works/page.tsx
'use client';
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import sale1 from "../../assets/images/sale1.png";
import sale2 from "../../assets/images/sale2.png";
import sale3 from "../../assets/images/sale3.png";
import sale4 from "../../assets/images/sale4.png";
import service1 from "../../assets/images/service1.png";
import service2 from "../../assets/images/service2.png";
import service3 from "../../assets/images/service3.png";
import service4 from "../../assets/images/service4.png";
import task1 from "../../assets/images/task1.png";
import task2 from "../../assets/images/task2.png";
import task3 from "../../assets/images/task3.png";
import task4 from "../../assets/images/task4.png";  
import ImagePreview from "../components/ImagePreview";

export default function WorksPage() {
  const [selectedWork, setSelectedWork] = useState<{
    images: { src: any; alt: string }[];
    index: number;
  } | null>(null);
  
  const works = [
    {
      id: "sales",
      dateRange: "2024",
      title: "Proponent app 0 to 1",
      description: "Revolutionizing sales enablement through AI",
      details: "From customer journey, information architecture, interaction flows, and visual design, I shaped the entire user experience as a founding designer. Build a cohesive product that empower sales teams and product marketing managers, together with the PM and Eng.",
      projectUrl: "#",
      images: [
        { src: sale4, alt: "Proponent Example 1" },
        { src: sale1, alt: "Proponent Example 2" },
        { src: sale2, alt: "Proponent Example 3" },
        { src: sale3, alt: "Proponent Example 4" },
       
      ]
    },
    {
      id: "integration",
      dateRange: "2023",
      title: "VMware Cloud Service Integration",
      description: "Unified workflow to augment cloud capabilities",
      details: "To support the new business requirement (license to subscription mode transition), I designed a cloud service integration strategy that reduce the time-to-value.",
      projectUrl: "#",
      images: [
        { src: service4, alt: "VMware Cloud Service Integration Example 1" },
        { src: service1, alt: "VMware Cloud Service Integration Example 1" },
        { src: service2, alt: "VMware Cloud Service Integration Example 1" },
        { src: service3, alt: "VMware Cloud Service Integration Example 1" },
        
      ]
    },
    {
      id: "monitor",
      dateRange: "2023",
      title: "VMware Cloud Task Monitor",
      description: "Uncover a hidden behavior to facilitate task monitoring",
      details: "Designed phased solutions for VMware's core task monitoring system, a critical component used across products by millions of users. The strategy balanced quick implementation needs with long-term scalability.",
      projectUrl: "#",
      images: [
        { src: task4, alt: "VMware Cloud Task Monitor Example 1" },
        { src: task1, alt: "VMware Cloud Task Monitor Example 2" },
        { src: task2, alt: "VMware Cloud Task Monitor Example 3" },
        { src: task3, alt: "VMware Cloud Task Monitor Example 4" },
       
        
      ]
    },
    // {
    //   id: "pmm",
    //   dateRange: "2021",
    //   title: "Securonix Policy Creation",
    //   description: "Streamline the process of building tailored policies",
    //   details: "Identified key bottlenecks in the policy creation workflow through in-depth user research, and implemented a practical and innovative solution in a cohesive manner.",
    //   projectUrl: "#",
    //   images: [
    //     { src: work6, alt: "Securonix Policy Creation Example 1" },
       
    //   ]
    // }
  ];

  return (
    <div className="space-y-12">
      <h1 className="font-semibold">Works</h1>
      
      <div className="space-y-16">
        {works.map((work, index) => (
          <div key={index}>
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
              
              {/* Make description clickable with hover arrow */}
              <Link 
                href={`/n/works/${work.id}`}
                className="block group"
              >
                <p className={`font-semibold mb-2 transition-colors duration-200 inline-flex items-center
                  ${work.id === 'sales' ? 'hover:text-[#F8961E]' : ''}
                  ${work.id === 'integration' ? 'hover:text-[#A7A622]' : ''}
                  ${work.id === 'monitor' ? 'hover:text-[#59829E]' : ''}`}
                >
                  {work.description}
                  <span className="ml-2 opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </p>
              </Link>
              
              {/* New Details paragraph */}
              <p className="text-gray-600 mb-2">{work.details}</p>

              {/* Images */}
              <div className="mt-4 grid grid-cols-4 gap-4">
                {work.images.map((image, imageIndex) => (
                  <div 
                    key={imageIndex}
                    className=" aspect-video relative cursor-pointer"
                    onClick={() => setSelectedWork({ images: work.images, index: imageIndex })}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={imageIndex === 0}
                      className="object-cover rounded-lg border border-gray-100 hover:opacity-90 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

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

