'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ImagePreview from "../../components/ImagePreview";

export default function CaseStudyDetail() {
    console.log('here CaseStudyDetail');
    const router = useRouter();
    const params = useParams();
  
    // Sample case study data - you'll want to match this with your works data
    const caseStudy = {
      id: "sales",
      title: "Proponent Sales Enablement",
      subtitle: "From the initial idea to the product in 6 months",
      background: "I was approached by a founder at YC matching platform regarding his startup idea. We clicked instantly, and I resonated with the vision and Streamlit prototype. Along with another engineer, the startup journey began.",
      problemImages1: [
        "https://res.cloudinary.com/dsu2yornu/image/upload/v1737074037/Group_20921_exonso.jpg",
      ],
      problem: "While salespeople drive revenue by engaging directly with customers and understanding their needs, they often lack deep product knowledge due to their customer-facing role. Product Marketing Managers (PMMs), who own the product roadmap and feature development, possess this comprehensive product understanding. However, the knowledge transfer between PMMs and sales teams is frequently inadequate, resulting in standardized sales content that fails to address diverse customer requirements.",

      solutionImages1: [
        "https://res.cloudinary.com/dsu2yornu/image/upload/v1737073983/Group_39585_fmr8me.jpg",
      ],
      solution: [
        "Proponent bridges the gap between sales and PMMs through AI. By leveraging PMM-curated product knowledge, the platform matches products and features to specific customer pain points and requirements, whether they emerge from meetings, chats, or email exchanges.",
        "PMMs maintain their product knowledge in Proponent just as they would in traditional knowledge base platforms. They can easily map features to specific pain points, creating a robust foundation for AI-driven recommendations.",
        "Through CRM and service integrations, Proponent automatically converts sales-customer conversations into actionable insights. Sales teams can explore detailed conversation quotes and receive AI-recommended content tailored to each customer, thus accelerate deal closure.",
    
      ],
      solutionImages2: [
        "https://res.cloudinary.com/dsu2yornu/image/upload/v1737074028/Group_39588_coly1x.png",
      ],
      solutionImages3: [
        "https://res.cloudinary.com/dsu2yornu/image/upload/v1737073983/Group_39587_fwr7qq.jpg",
      ],

      impact: "From high-level strategy, user flows, information architecture, visual design, and marketing website, I crafted Proponent's comprehensive product vision. Together with PM and engineering, we successfully launched the product in six months, receiving positive market response."
    };
  
    const [selectedWork, setSelectedWork] = useState<{
      images: { src: any; alt: string }[];
      index: number;
    } | null>(null);
  
    return (
      <div className="min-h-screen bg-white pb-32">
        {/* Main content container */}
        {/* <div className="max-w-[744px] mx-auto px-6"> */}
          {/* Back button aligned with content */}
          <button 
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2 mb-8"
          >
            ← Back
          </button>
  
          {/* Title */}
        {/* <p className="font-semibold mb-2 hover:text-gray-700">{caseStudy.title}</p> */}
        <span className="text-sm text-gray-500">{caseStudy.title}</span>
        
        {/* Subtitle */}
        <p className="font-semibold mb-2 hover:text-gray-700 mt-2 mb-8">{caseStudy.subtitle}</p>

        {/* Background */}
        <section className="space-y-2">
          <span className="text-sm text-gray-500">Background</span>
          
          <p className="text-gray-800 mb-4">{caseStudy.background}</p>
        </section>

        {/* Problem */}
        <section className="space-y-2">
        <span className="text-sm text-gray-500">Problem</span>
         

          <p className="text-gray-800 mb-4">{caseStudy.problem}</p>
        </section>

        {/* Solution */}
        <section className="space-y-2 mt-8">
        <span className="text-sm text-gray-500">Solution</span>
          {/* Solution Images 1 */}
          <div className="w-4/5 mx-auto grid grid-cols-1 gap-4 mt-4 mb-4">
            {caseStudy.solutionImages1.map((imageUrl, index) => (
              <div 
                key={index}
                className="cursor-pointer"
                onClick={() => setSelectedWork({ 
                  images: caseStudy.solutionImages1.map(src => ({ src, alt: `Solution illustration ${index + 1}` })), 
                  index 
                })}
              >
                <Image
                  src={imageUrl}
                  alt={`Solution illustration ${index + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  className="hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>

         {/* First paragraph */}
  <p className="text-gray-800">{caseStudy.solution[0]}</p>

          {/* Solution Images 2 */}
          <div className="w-4/5 mx-auto grid grid-cols-1 gap-4 my-6">
            {caseStudy.solutionImages2.map((imageUrl, index) => (
              <div 
                key={index}
                className="cursor-pointer"
                onClick={() => setSelectedWork({ 
                  images: caseStudy.solutionImages2.map(src => ({ src, alt: `Solution illustration ${index + 1}` })), 
                  index 
                })}
              >
                <Image
                  src={imageUrl}
                  alt={`Solution illustration ${index + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  className="hover:opacity-90 transition-opacity rounded-md"
                />
              </div>
            ))}
          </div>

           {/* Second paragraph */}
  <p className="text-gray-800">{caseStudy.solution[1]}</p>

           {/* Solution Images 3 */}
            <div className="w-4/5 mx-auto grid grid-cols-1 gap-4 my-6">
            {caseStudy.solutionImages3.map((imageUrl, index) => (
              <div 
                key={index}
                className="cursor-pointer"
                onClick={() => setSelectedWork({ 
                  images: caseStudy.solutionImages3.map(src => ({ src, alt: `Solution illustration ${index + 1}` })), 
                  index 
                })}
              >
                <Image
                  src={imageUrl}
                  alt={`Solution illustration ${index + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  className="hover:opacity-90 transition-opacity rounded-md"
                />
              </div>
            ))}
          </div>
        </section>

         {/* Third paragraph */}
        <p className="text-gray-800">{caseStudy.solution[2]}</p>


        {/* Impact */}
        <section className="space-y-2 mt-8">
        <span className="text-sm text-gray-500">Impact</span>
          <div className="space-y-2">
            <p className="text-gray-800">{caseStudy.impact}</p>
          </div>
        </section>

      

        {/* Image Preview Modal - shared for all images */}
        {selectedWork !== null && (
          <ImagePreview
            isOpen={selectedWork !== null}
            onClose={() => setSelectedWork(null)}
            images={selectedWork.images}
            currentImageIndex={selectedWork.index}
          />
        )}

      </div>
    // </div>
  );
} 