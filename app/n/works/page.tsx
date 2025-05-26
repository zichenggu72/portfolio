// app/works/page.tsx
'use client';
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import sale4 from "../../assets/images/sale4.png";
import service4 from "../../assets/images/service4.png";
import task4 from "../../assets/images/task4.png";

export default function WorksPage() {
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  
  const works = [
    {
      id: "sales",
      dateRange: "2024",
      title: "Proponent app 0 to 1",
      description: "Conversation Intelligence to Sales Success",
      details: "From customer journey, information architecture, interaction flows, and visual design, I shaped the entire user experience as a founding designer. Build a cohesive product that empower sales teams and product marketing managers, together with the PM and Eng.",
      projectUrl: "#",
      previewImage: sale4,
    },
    {
      id: "integration",
      dateRange: "2023",
      title: "VMware Cloud Service Integration",
      description: "Unified workflow to augment cloud capabilities",
      details: "To support the new business requirement (license to subscription mode transition), I designed a cloud service integration strategy that reduce the time-to-value.",
      projectUrl: "#",
      previewImage: service4,
    },
    {
      id: "monitor",
      dateRange: "2023",
      title: "VMware Cloud Task Monitor",
      description: "Uncover a hidden behavior to facilitate task monitoring",
      details: "Designed phased solutions for VMware's core task monitoring system, a critical component used across products by millions of users. The strategy balanced quick implementation needs with long-term scalability.",
      projectUrl: "#",
      previewImage: task4,
    },
  ];

  return (
    <div className="space-y-12 relative">
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .gradient-underline-sales {
          background: linear-gradient(90deg, rgb(248, 150, 30) 0%, rgb(231, 176, 12) 33%, rgb(144, 190, 109) 66%, rgb(77, 144, 142) 100%);
          background-size: 95% 1.6px;
          background-position: 0 100%;
          background-repeat: no-repeat;
        }
        .gradient-underline-integration {
          background: linear-gradient(90deg, rgb(248, 150, 30) 0%, rgb(231, 176, 12) 33%, rgb(144, 190, 109) 66%, rgb(77, 144, 142) 100%);
          background-size: 95% 1.6px;
          background-position: 0 100%;
          background-repeat: no-repeat;
        }
        .gradient-underline-monitor {
          background: linear-gradient(90deg, rgb(248, 150, 30) 0%, rgb(231, 176, 12) 33%, rgb(144, 190, 109) 66%, rgb(77, 144, 142) 100%);
          background-size: 96% 1.6px;
          background-position: 0 100%;
          background-repeat: no-repeat;
        }
      `}</style>
      
      <h1 className="font-semibold">Works</h1>
      
      <div className="space-y-16">
        {works.map((work, index) => (
          <div key={index} className="relative">
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
                onMouseEnter={() => setHoveredWork(work.id)}
                onMouseLeave={() => setHoveredWork(null)}
              >
                <p className={`font-semibold mb-2 transition-colors duration-200 inline-flex items-center
                  ${work.id === 'sales' ? 'hover:text-[#F8961E] gradient-underline-sales' : ''}
                  ${work.id === 'integration' ? 'hover:text-[#A7A622] gradient-underline-integration' : ''}
                  ${work.id === 'monitor' ? 'hover:text-[#59829E] gradient-underline-monitor' : ''}`}
                >
                  {work.description}
                  <span className="ml-2 opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </p>
              </Link>
              
              {/* Details paragraph */}
              <p className="text-gray-600 mb-2">{work.details}</p>
            </div>

            {/* Individual floating preview image for this work item */}
            {hoveredWork === work.id && (
              <div className="absolute top-full left-0 right-0 pointer-events-none z-50 flex justify-center mt-4 opacity-0 animate-fade-in">
                <div className="w-[620px] h-[400px] relative">
                  <Image
                    src={work.previewImage}
                    alt={`${work.id} preview`}
                    fill
                    className="object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}