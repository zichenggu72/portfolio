'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CaseStudyDetail() {
    console.log('here CaseStudyDetail');
    const router = useRouter();
    const params = useParams();
  
    // Sample case study data - you'll want to match this with your works data
    const caseStudies = {
      'vmware-cloud-integration': {
        title: "VMware Cloud Integration",
        subtitle: "Unified workflow to augment cloud capabilities",
        background: "VMware, with its core vSphere product serving over 400,000 customers. VMware Cloud, as a major business segment of VMware, is transitioning from a license-based to a subscription-based business model. As part of this transformation, VMware has integrated various complementary services with vSphere to create comprehensive solution packages.",
        problem: "Looking at the current integrated service page, Besides the visual problems like service cards are not aligned, so many status indicators create an undesired and overwhelming environment. After the subscription model is introduced, more complexity will be added.",
        solution: [
          "To expedite service consumption, I designed a strategy to categorize services into two categories: “Activated” services and “Available for Activation” services. This would ensure that the services ready for immediate use are the most prominently displayed for users. ",
          "Individual service purchases are strategically made visible to users, driving additional revenue streams while enabling customers to enhance their cloud capabilities through potential purchases."
        ],
        problemImages: [
          "https://res.cloudinary.com/dsu2yornu/image/upload/v1735887599/vmc1_d3nlsw.png",
          "https://res.cloudinary.com/dsu2yornu/image/upload/v1735887599/vmc1_d3nlsw.png"
        ]
      }
      // Add other case studies as needed
    };
  
    const caseStudy = caseStudies[params.id as string];
  
    return (
      <div className="min-h-screen bg-white">
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
          
          <p className="text-gray-600 mb-4">{caseStudy.background}</p>
        </section>

        {/* Problem */}
        <section className="space-y-2">
        <span className="text-sm text-gray-500">Problem</span>
          <p className="text-gray-600 mb-4">{caseStudy.problem}</p>
          
          {/* Images grid with optimized URLs */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {caseStudy.problemImages.map((imageUrl, index) => (
              <img
                key={index}
                src="https://res.cloudinary.com/dsu2yornu/image/upload/v1735887599/vmc1_d3nlsw.png"  // Add optimization parameters
                alt={`Problem illustrat123ion ${index + 1}`}
                className="w-full rounded-lg"
              />
            ))}
          </div>
        </section>

        {/* Solution */}
        <section className="space-y-2">
        <span className="text-sm text-gray-500">Solution</span>
        <div className="space-y-4">  {/* Add spacing between paragraphs */}
          {caseStudy.solution.map((paragraph, index) => (
          <p key={index} className="text-gray-600">{paragraph}</p>
           ))}
        </div>
        </section>

      </div>
    // </div>
  );
} 