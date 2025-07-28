'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ImagePreview from "../../components/ImagePreview";
import { motion } from 'framer-motion';

export default function CaseStudyDetail() {
    console.log('here CaseStudyDetail');
    const router = useRouter();
    const params = useParams();
  
    // Sample case study data - you'll want to match this with your works data
    const caseStudy = {
      id: "integration",
      title: "VMware Cloud Integration",
      subtitle: "Unified workflow to augment cloud capabilities",
      background: "VMware, with its core vSphere product serving over 400,000 customers. VMware Cloud, as a major business segment of VMware, is transitioning from a license-based to a subscription-based business model. As part of this transformation, VMware has integrated various complementary services with vSphere to create comprehensive solution packages.",
      problemImages1: [
        "https://res.cloudinary.com/dsu2yornu/image/upload/v1735924435/Group_20836_vc9pev.svg",
      ],
      problem: "Looking at the current integrated service page, Besides the visual problems like service cards are not aligned, so many status indicators create an undesired and overwhelming environment. After the subscription model is introduced, more complexity will be added.",

      solutionImages1: [
        "https://res.cloudinary.com/dsu2yornu/image/upload/v1735923739/Group_20833_cawpy1.svg",
      ],
      solution: [
        "To expedite service consumption, I designed a strategy to categorize services into two categories: “Activated” services and “Available for Activation” services. This would ensure that the services ready for immediate use are the most prominently displayed for users. ",
        "Individual service purchases are strategically made visible to users, driving additional revenue streams while enabling customers to enhance their cloud capabilities through potential purchases."
      ],
      solutionImages2: [
        "https://res.cloudinary.com/dsu2yornu/image/upload/v1735927678/vCenter_-_Deployment_details_xvz9ie.svg",
      ],
      impact: "1. 8 out of 8 users detect the new tab system and complete the tasks successfully.\n\n2. Aim to reduce the time-to-value by 30%, reached 46%",
      whatIlearned: "1. Embrace the changing requirements. I have wondered that why our priorities are always changing. One day our focus is on the launchpad, the next day it shifts to services, and next week it shifts to Org view. This shifting landscape can be a bit challenging to keep up with. However, over time, I've come to understand that in the realm of live and active products, change is the only constant. I've learned to embrace this ever-evolving nature and adapt to it effectively.\n\n2. Through project reflection, I identified an opportunity to strengthen our data-driven approach: conducting comprehensive analysis of service categorization methods earlier in the design phase. By examining subscription patterns, availability metrics, and usage frequency, we could have further optimized service organization"
    };
  
    const [selectedWork, setSelectedWork] = useState<{
      images: { src: any; alt: string }[];
      index: number;
    } | null>(null);
  
      return (
    <motion.div 
      className="min-h-screen bg-white pb-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
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
          
          <p className="text-gray-800 mb-4 leading-relaxed">{caseStudy.background}</p>
        </section>

        {/* Problem */}
        <section className="space-y-2 mt-12">
        <span className="text-sm text-gray-500">Problem</span>
          {/* Problem Images */}
          <div className="gap-4 mt-4 mb-4">
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

          <p className="text-gray-800 mb-4 leading-relaxed">{caseStudy.problem}</p>
        </section>

        {/* Solution */}
        <section className="space-y-2 mt-16">
        <span className="text-sm text-gray-500">Solution</span>
          {/* Solution Images 1 */}
          <div className="w-3/4 gap-4 mt-4 mb-4">
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
  <p className="text-gray-800 mb-12 leading-relaxed">{caseStudy.solution[0]}</p>

          {/* Solution Images 2 */}
          <div className="grid grid-cols-1 gap-4 mt-6 mb-4">
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
  <p className="text-gray-800 leading-relaxed">{caseStudy.solution[1]}</p>

        </section>

        {/* Impact */}
        <section className="space-y-2 mt-16">
        <span className="text-sm text-gray-500">Impact</span>
          <div className="space-y-2">
            <p className="text-gray-800 leading-relaxed">
              1. <span className="font-bold">8 out of 8</span> users detect the new tab system and complete the tasks successfully.
            </p>
            <p className="text-gray-800 leading-relaxed">
              2. Aim to reduce the time-to-value by 30%, <span className="font-bold">reached 46%</span>
            </p>
          </div>
        </section>

        {/* What I Learned */}
        <section className="space-y-2 mt-16">
        <span className="text-sm text-gray-500">What I Learned</span>
          <div className="space-y-4">
            <p className="text-gray-800 leading-relaxed">
              1. Embrace the changing requirements. I have wondered that why our priorities are always changing. One day our focus is on the launchpad, the next day it shifts to services, and next week it shifts to Org view. This shifting landscape can be a bit challenging to keep up with. However, over time, I've come to understand that in the realm of live and active products, change is the only constant. I've learned to embrace this ever-evolving nature and adapt to it effectively.
            </p>
            <p className="text-gray-800 leading-relaxed">
              2. Through project reflection, I identified an opportunity to strengthen our data-driven approach: conducting comprehensive analysis of service categorization methods earlier in the design phase. By examining subscription patterns, availability metrics, and usage frequency, we could have further optimized service organization.
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

      </motion.div>
    // </div>
  );
} 