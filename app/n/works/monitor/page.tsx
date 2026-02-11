'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ImagePreview from "../../components/ImagePreview";
import WorkNavigation from "../components/WorkNavigation";
import { motion } from 'framer-motion';

export default function CaseStudyDetail() {
    console.log('here CaseStudyDetail');
    const params = useParams();
  
    // Sample case study data - you'll want to match this with your works data
    const caseStudy = {
      id: "monitor",
      title: "VMware Cloud Task Monitor",
      subtitle: "Uncover a hidden behavior to facilitate task monitoring",
      background: "Task monitoring panel is a component that is used across all the VMware cloud products. It will be triggered whenever asynchronous tasks take place. It serves as a crucial interface element that helps users track ongoing system operations.",
      problemImages1: [
        "https://res.cloudinary.com/dsu2yornu/image/upload/v1767640713/Group_39679_wvmln7.svg",
      ],
      problem: [
        "There are 2 concerns regarding the current usage:",
        "\n1. The task panel behaves as an overlay with no DISMISS function.\n2. Once a task is completed, there is no way to access the past tasks.",
        
        "After reading through all the doc and digging into the design system and demo of the component, I discovered that the problem was not like how it was described. There is a DISMISS button but it shows up only when user entering the detail view. It's hard for user to naturally discover the detail view.",
        
        "Without this knowledge, the task panel is an overlay and blocks and hides UI elements even when collapsed. Even with this knowledge, users need to dismiss the operation one by one to get rid of the panel is tedious."
      ],

      solutionImages1: [
        "https://res.cloudinary.com/dsu2yornu/image/upload/v1767642668/monitor1_kpd0bc.svg",
      ],
      solution: [
        "I implemented a two-phased approach to address these issues. The short-term solution simplified the information hierarchy by consolidating dismiss actions while maintaining individual cancel options per task, reducing multiple clicks to a single interaction.",
        "For the long-term vision, I developed a dedicated task panel with PIN functionality, backed by user research with 10 experts who are well-versed in our product.",
        "The PIN feature allowed users to toggle between persistent display and minimized views, accommodating both focused monitoring and multitasking preferences.",
        "Implementation feasibility was confirmed through discovery of an existing PIN functionality during the design share-out meeting."
      ],
      solutionImages2: [
        "https://res.cloudinary.com/dsu2yornu/image/upload/v1767640713/Group_27167_v08mkv.svg",
      ],
      impact: "The solution significantly improved user workflow efficiency by reducing interaction steps and providing flexible viewing options.",
      whatIlearned: "1. Knowledge is distributed among various stakeholders in a large organization. Effective communication and finding the right contact is crucial for success.\n\n2. Maintaining structured documentation throughout the project lifecycle proves invaluable for decision tracking and reasoning, especially in long-term projects."
    };
  
    const [selectedWork, setSelectedWork] = useState<{
      images: { src: any; alt: string }[];
      index: number;
    } | null>(null);
  
      return (
    <motion.div
      className="min-h-screen bg-white dark:bg-[#1a1a1a] pb-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
        {/* Main content container */}
        {/* <div className="max-w-[744px] mx-auto px-6"> */}

          {/* Title */}
        {/* <p className="font-semibold mb-2 hover:text-gray-700">{caseStudy.title}</p> */}
        <span className="text-sm text-gray-500 dark:text-gray-400">{caseStudy.title}</span>

        {/* Subtitle */}
        <p className="text-lg font-semibold mb-2 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 mt-2 mb-8">{caseStudy.subtitle}</p>

        {/* Background */}
        <section className="space-y-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Background</span>

          <p className="text-gray-800 dark:text-gray-400 mb-4 leading-relaxed">{caseStudy.background}</p>
        </section>

        {/* Problem */}
        <section className="space-y-2 mt-8">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">Problem</span>
          {/* Problem Images */}
          <div className="grid grid-cols-1 gap-4 mt-4 mb-4">
            {caseStudy.problemImages1.map((imageUrl, index) => (
              <div 
                key={index}
                className="cursor-pointer"
                onClick={() => setSelectedWork({ 
                  images: caseStudy.problemImages1.map(src => ({ src, alt: `Problem illustration ${index + 1}` })), 
                  index 
                })}
              >
                <Image
                  src={imageUrl}
                  alt={`Problem illustration ${index + 1}`}
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

          <p className="text-gray-800 dark:text-gray-400 mb-4 leading-relaxed">{caseStudy.problem[0]}</p>
          <div className="space-y-1 mb-4">
            <p className="text-gray-800 dark:text-gray-400 leading-relaxed">
              1. The task panel behaves as an overlay with no DISMISS function.
            </p>
            <p className="text-gray-800 dark:text-gray-400">
              2. Once a task is completed, there's no way to access the past tasks.
            </p>
          </div>
          <p className="text-gray-800 dark:text-gray-400 mb-4 leading-relaxed">{caseStudy.problem[2]}</p>
          <p className="text-gray-800 dark:text-gray-400 mb-4 leading-relaxed">{caseStudy.problem[3]}</p>

        </section>

        {/* Solution */}
        <section className="space-y-2 mt-16">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">Solution</span>
          {/* Solution Images 1 */}
          <div className="grid gap-4 mb-4">
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
  <p className="text-gray-800 dark:text-gray-400 leading-relaxed">{caseStudy.solution[0]}</p>

          {/* Solution Images 2 */}
          <div className="grid grid-cols-1 gap-4 mt-12 mb-4">
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
  <p className="text-gray-800 dark:text-gray-400 leading-relaxed">{caseStudy.solution[1]}</p>
  <p className="text-gray-800 dark:text-gray-400 leading-relaxed">{caseStudy.solution[2]}</p>
  <p className="text-gray-800 dark:text-gray-400 leading-relaxed">{caseStudy.solution[3]}</p>


        </section>

        {/* Impact */}
        <section className="space-y-2 mt-16">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">Impact</span>
          <div className="space-y-2">
            <p className="text-gray-800 dark:text-gray-400 leading-relaxed">{caseStudy.impact}</p>
          </div>
        </section>

        {/* What I Learned */}
        <section className="space-y-2 mt-16">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">What I Learned</span>
          <div className="space-y-4">
            <p className="text-gray-800 dark:text-gray-400 leading-relaxed">
              1. Knowledge is distributed among various stakeholders in a large organization. Effective communication and finding the right contact is crucial for success.
            </p>
            <p className="text-gray-800 dark:text-gray-400 leading-relaxed">
              2. Maintaining structured documentation throughout the project lifecycle proves invaluable for decision tracking and reasoning, especially in long-term projects.
            </p>
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

        {/* Navigation */}
        <WorkNavigation />

      </motion.div>
    // </div>
  );
} 