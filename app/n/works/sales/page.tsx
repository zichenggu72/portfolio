'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ImagePreview from "../../components/ImagePreview";
import { motion } from 'framer-motion';

// Updated case study data with new content
const CASE_STUDY_DATA = {
  id: "sales",
  title: "Proponent Sales Enablement",
  subtitle: "Conversation Intelligence to Sales Success",
  problemImages: [
    "https://res.cloudinary.com/dsu2yornu/image/upload/v1753675937/Banner1_urcpkl.jpg",
  ],
  problem: "While salespeople drive revenue by engaging directly with customers and understanding their needs, they often lack deep product knowledge due to their customer-facing role. Product Marketing Managers (PMMs), who own the product roadmap and feature development, possess this comprehensive product understanding. However, **the knowledge transfer between PMMs and sales teams is frequently inadequate**, resulting in standardized sales content that fails to address diverse customer requirements.** And thus causes the loss of deals.",
  solutionVideos: {
    step1: "https://res.cloudinary.com/dsu2yornu/video/upload/v1748240683/Screen_Recording_2025-05-25_at_11.10.27_PM_aru0ti.mov",
    step2: "https://res.cloudinary.com/dsu2yornu/video/upload/v1748233340/Screen_Recording_2025-05-25_at_9.06.01_PM_ng1k4u.mov",
  },
  solution: [
    "For Sales team, Proponent extract key insights and action items for each valuable customer call, delivering timely, relevant information that enhances every customer engagement. By leveraging the PMM-curated product knowledge library (GTM hub), Proponent AI provides recommendations that actually drive results.",
    "For Marketing team, Proponent provides a knowledge library (GTM hub) that is easy to manage and maintain all the products, personas, and insights. Knowledge transfer between sales and marketing has never been easier. The hub also serves as an AI training ground, with the knowledge inputs, Proponent AI continuously learning about the products and personas to deliver increasingly accurate recommendations.",
  ],
  impact: "From high-level strategy, user flows, information architecture, visual design, marketing website, and demo video, I crafted Proponent's comprehensive product vision. Together with PM and engineering, we successfully launched the product in six months, receiving positive market response, got accepted to incubators, and the design itself is awarded multiple times.",
  research: {
    title: "Research",
    content: "The research methods I have adopted along the design process:",
    methods: [
      "Conducted **end-to-end product audits** of major players in the sales and deal management industry, capturing key features and documenting inspiring design elements and interactions. This helped identify what executed well and potential opportunities for differentiation.",
      "Proactively **reached out to sales and marketing professionals in the field** to gather feedback and advice during the building process, ensuring our solutions aligned with real-world needs and pain points.",
      "Maintained **regular conversations with design experts** to address design-related questions, from exploring different conceptual options to refining visual execution and identifying potential friction points that could impact user experience."
    ]
  },
  legoBricks: {
    title: "Build the Lego bricks",
    intro: "One of the most significant lessons I learned while building this product from the ground up was the critical importance of systems design thinking. Initially, I approached each feature in isolation, focusing on individual key actions. However, I gradually discovered that scalable design requires a \"Lego brick\" approach—identifying versatile, reusable components that can be combined in different ways.",
    subtitle: "Key system components that emerged:",
    components: [
      "**Title-subtitle pattern:** I recognized that pairing a primary title with a secondary subtitle was widely applicable and essential, as we consistently needed that additional context layer—whether for insights, meetings, or other content areas.",
      "**Side panel (drawer) component:** Originally introduced for meetings to enable swift switching between meeting insights and summaries, this component proved so effective that we successfully adopted it across other areas, including insights panels and analytics panels.",
      "**Card-based layouts:** This concept was adopted later in the design process after I realized how effectively cards handled responsive design challenges and created cleaner, more hierarchical visuals that improved overall clarity."
    ]
  },
  archivedHistory: {
    title: "Archived history",
    content: "Looking back is always a time to reflect and appreciate how far we've come. Everything started with casual mockups in Figma and evolved into what it is today through countless rounds of iterations and refinements. I'm confident it will continue to grow beyond what we've achieved so far. I'm deeply grateful for all the help and encouragement I've received along the way—especially those moments when I felt truly connected with the team, working together toward a shared vision that felt bigger.",
    video: "https://res.cloudinary.com/dsu2yornu/video/upload/v1748045961/0523_xcm5jj.mov"
  }
};

export default function CaseStudyDetail() {
  console.log('here CaseStudyDetail');
  
  const router = useRouter();
  const params = useParams();
  const [selectedWork, setSelectedWork] = useState<{
    images: { src: string; alt: string }[];
    index: number;
  } | null>(null);
  
  // Reusable function for handling image clicks
  const handleImageClick = (images, index = 0) => {
    setSelectedWork({ 
      images: images.map(src => ({ src, alt: `Solution illustration ${index + 1}` })), 
      index 
    });
  };

  // Reusable component for rendering image sections
  const ImageSection = ({ images, onClick, className = "" }) => (
    <div className={`w-full grid grid-cols-1 gap-4 ${className}`}>
      {images.map((imageUrl, index) => (
        <div 
          key={index}
          className="cursor-pointer"
          onClick={() => onClick(images, index)}
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
  );

  // Reusable component for section headers
  const SectionHeader = ({ children }) => (
    <span className="text-sm font-semibold text-gray-900 dark:text-white">{children}</span>
  );

  // Helper function to render text with bold markdown
  const renderTextWithBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-[#1a1a1a] pb-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-2 mb-8"
      >
        ← Back
      </button>

      {/* Header Section */}
      <header className="mb-8">
        <span className="text-sm text-gray-500 dark:text-gray-400">{CASE_STUDY_DATA.title}</span>
        <p className="text-lg font-semibold mb-2 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 mt-2">
          {CASE_STUDY_DATA.subtitle}
        </p>
      </header>

      {/* Problem Section */}
      <section className="space-y-2 mb-8">
        <SectionHeader>Problem</SectionHeader>
        <p className="text-gray-800 dark:text-gray-400 mb-8 leading-relaxed">{renderTextWithBold(CASE_STUDY_DATA.problem)}</p>
        
        {/* Problem Image */}
        <ImageSection 
          images={CASE_STUDY_DATA.problemImages} 
          onClick={handleImageClick}
          className="mt-4"
        />
      </section>

      {/* Solution Section */}
      <section className="space-y-2 mt-16">
        <SectionHeader>Solution</SectionHeader>
        
        {/* Solution Step 1 - Sales Team */}
        <div className="w-full mx-auto mt-4 mb-4">
          <video
            className="w-full h-auto shadow-lg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={CASE_STUDY_DATA.solutionVideos.step1} type="video/quicktime" />
            <source src={CASE_STUDY_DATA.solutionVideos.step1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-gray-800 dark:text-gray-400 mb-12 leading-relaxed">{CASE_STUDY_DATA.solution[0]}</p>

        {/* Solution Step 2 - Marketing Team */}
        <div className="w-full mx-auto mt-4 mb-4">
          <video
            className="w-full h-auto shadow-lg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={CASE_STUDY_DATA.solutionVideos.step2} type="video/quicktime" />
            <source src={CASE_STUDY_DATA.solutionVideos.step2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-gray-800 dark:text-gray-400 leading-relaxed">{CASE_STUDY_DATA.solution[1]}</p>
      </section>

      {/* Impact Section */}
      <section className="space-y-2 mt-16">
        <SectionHeader>Impact</SectionHeader>
        <p className="text-gray-800 dark:text-gray-400 leading-relaxed">{CASE_STUDY_DATA.impact}</p>

            <a
              href="https://proponentapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline block mt-2"
            >
              https://proponentapp.com/
            </a>
          </section>


      {/* Research Section */}
      <section className="space-y-2 mt-16">
        <SectionHeader>{CASE_STUDY_DATA.research.title}</SectionHeader>
        <p className="text-gray-800 dark:text-gray-400 mb-4 leading-relaxed">{CASE_STUDY_DATA.research.content}</p>
        <div className="space-y-3">
          {CASE_STUDY_DATA.research.methods.map((method, index) => (
            <p key={index} className="text-gray-800 dark:text-gray-400 leading-relaxed">
              {index + 1}. {renderTextWithBold(method)}
            </p>
          ))}
        </div>
      </section>

      {/* Build the Lego bricks Section */}
      <section className="space-y-2 mt-16">
        <SectionHeader>{CASE_STUDY_DATA.legoBricks.title}</SectionHeader>
        <p className="text-gray-800 dark:text-gray-400 mb-4 leading-relaxed">{CASE_STUDY_DATA.legoBricks.intro}</p>
        <p className="text-gray-800 dark:text-gray-400 mb-4 leading-relaxed">{CASE_STUDY_DATA.legoBricks.subtitle}</p>
        <div className="space-y-3">
          {CASE_STUDY_DATA.legoBricks.components.map((component, index) => (
            <p key={index} className="text-gray-800 dark:text-gray-400 leading-relaxed">
              {index + 1}. {renderTextWithBold(component)}
            </p>
          ))}
        </div>
      </section>

      {/* Archived History Section */}
      <section className="space-y-2 mt-16">
        <SectionHeader>{CASE_STUDY_DATA.archivedHistory.title}</SectionHeader>
        <p className="text-gray-800 dark:text-gray-400 mb-4 leading-relaxed">{CASE_STUDY_DATA.archivedHistory.content}</p>
        
        {/* Archived History Video */}
        <div className="w-full mx-auto mt-4 mb-4">
          <video
            className="w-full h-auto shadow-lg "
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={CASE_STUDY_DATA.archivedHistory.video} type="video/quicktime" />
            <source src={CASE_STUDY_DATA.archivedHistory.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Image Preview Modal */}
      {selectedWork !== null && (
        <ImagePreview
          isOpen={true}
          onClose={() => setSelectedWork(null)}
          images={selectedWork.images}
          currentImageIndex={selectedWork.index}
        />
      )}
    </motion.div>
  );
}