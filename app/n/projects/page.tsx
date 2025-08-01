// app/projects/page.tsx
'use client';
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import font1 from "../../assets/images/font1.jpg";
import font2 from "../../assets/images/font2.jpg";
import font3 from "../../assets/images/font3.jpg";
import nut1 from "../../assets/images/nut1.jpg";
import nut2 from "../../assets/images/nut2.jpg";
import nut3 from "../../assets/images/nut3.jpg";
import nut4 from "../../assets/images/nut4.jpg";
import food11 from "../../assets/images/food11.jpg";
import food22 from "../../assets/images/food22.jpg";
import food33 from "../../assets/images/food33.jpg";
import tool1 from "../../assets/images/tool1.png";
import tool2 from "../../assets/images/tool2.png";
import tool3 from "../../assets/images/tool3.png";
import ImagePreview from "../components/ImagePreview";
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<{
    images: { src: any; alt: string }[];
    index: number;
  } | null>(null);
  
  const projects = [
    {
      organization: "Font Craft Lab",
      year: "2025",
      title: "Font decoration tool",
      description: [
        "Idea to code with Figma Make.",
        "The initial idea is to decorate the letter and give typography another layer of expression. Build a tool, design the pattern, and code ßwith AI in a week.",
      ],
      images: [
        { src: tool1, alt: "News Font Example 1" },
        { src: tool2, alt: "News Font Example 2" },
        { src: tool3, alt: "News Font Example 3" },
      ],
    },
    {
      organization: "Food Photography",
      year: "2024",
      title: "Mundane Beauty",
      description: [
        "Explores common ingredients through an artistic lens.",
        "The series is still ongoing and aims to reveal the overlooked aesthetic qualities in common food ingredients, challenging us to find beauty in the mundane.",
      ],
      images: [
        { src: food11, alt: "News Font Example 1" },
        { src: food22, alt: "News Font Example 2" },
        { src: food33, alt: "News Font Example 3" },
      ],
    },

    {
      organization: "University of the Arts London",
      year: "2024",
      title: "The News Font",
      description: [
        "I designed an experimental typeface using discarded newspapers.",
        "Each character occupies equal space with 20% intentionally blacked out, symbolizing information gaps in modern news. Letters are dampened and adhered to windows, visible from both sides, encouraging multi-perspective interpretation of media.",
      ],
      images: [
        { src: font1, alt: "News Font Example 1" },
        { src: font2, alt: "News Font Example 2" },
        { src: font3, alt: "News Font Example 3" },
      ],
    },
    {
      organization: "Brand owner",
      year: "2024",
      title: "Good Nut Butter",
      description: [
        "I founded a passion-driven nut butter brand in China and managed every aspect of the brand from the ground up.",
        "From sourcing ingredients, crafting the product to creative marketing, I oversaw photography, social media content creation, and hands-on product and graphic design of packaging and market booths.",
      ],
      images: [
        { src: nut1, alt: "Nut Butter Example 1" },
        { src: nut2, alt: "Nut Butter Example 2" },
        { src: nut3, alt: "Nut Butter Example 3" },
        { src: nut4, alt: "Nut Butter Example 4" },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      
      <div className="space-y-16">
      {projects.map((project, projectIndex) => (
        <motion.article
          key={projectIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: projectIndex * 0.1 }}
          className="mb-4"
        >
          {/* Organization and Year */}
          <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-500">
              {project.organization}
            </span>
          <span className="text-sm text-gray-500">{project.year}</span>
          </div>
          
          {/* Title */}
          {project.title === "Font decoration tool" ? (
            <p className="font-semibold mb-2">
              <Link href="https://fontcraftlab.figma.site" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-[#7E7A84]">
                {project.title}
              </Link>
            </p>
          ) : (
            <p className="font-semibold mb-2">{project.title}</p>
          )}
          
          {/* Description */}
          <div className="space-y-2">
            {project.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600">
              {paragraph}
            </p>
          ))}
          </div>

          {/* Images Grid */}
          <div className={`grid ${project.title === "Good Nut Butter" ? 'grid-cols-4' : 'grid-cols-3'} gap-4 mt-6`}>
            {project.title === "Good Nut Butter" ? (
              <>
                <div className="col-span-4 h-full grid grid-cols-4 gap-4">
                  {project.images.slice(0, 4).map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-[3/4] relative cursor-pointer"
                      onClick={() => setSelectedProject({ images: project.images, index })}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        priority={index === 0}
                        className="object-cover rounded-lg hover:opacity-90 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
            
              </>
            ) : (
              project.images.map((image, index) => (
                <div 
                  key={index} 
                  className="aspect-[4/3] relative cursor-pointer"
                  onClick={() => setSelectedProject({ images: project.images, index })}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                    className="object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
              ))
            )}
          </div>
          
        </motion.article>
      ))}
      </div>

      {/* Image Preview Modal */}
      {selectedProject !== null && (
        <ImagePreview
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          images={selectedProject.images}
          currentImageIndex={selectedProject.index}
        />
      )}
    </div>
  );
}