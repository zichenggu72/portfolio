// app/projects/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SharedHeader from "../../components/SharedHeader";
import MainTabs from "../../components/MainTabs";
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
import keyboard1 from "../../assets/images/canvasgif.gif";
import keyboard2 from "../../assets/images/Frame 4.png";
import keyboard3 from "../../assets/images/Frame 3.png";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<{
    images: { src: any; alt: string }[];
    index: number;
  } | null>(null);

  const projects = [
    {
      organization: "Design Engineering",
      year: "2025",
      title: "Keyboard Canvas",
      description: [
        "Where colors can flow at your fingertips.",
        "A pixel art playground with infinite possibilities and keyboard magic.",
      ],
      images: [
        { src: keyboard1, alt: "News Font Example 1" },
        { src: keyboard2, alt: "News Font Example 2" },
        { src: keyboard3, alt: "News Font Example 3" },
      ],
    },
    {
      organization: "Figma Plugin",
      year: "2025",
      title: "Glass Grid Generator",
      description: [
        "Imagine looking at everything through frosted window panes. A Figma plugin that batch-generates glass-effect grids over images with configurable size and shape.",
      ],
      images: [
        { src: "/pic/project/glass-grid-1.png", alt: "Glass Grid Generator plugin UI" },
        { src: "/pic/project/glass-grid-2.png", alt: "Glass grid effect on foliage" },
        { src: "/pic/project/glass-grid-3.png", alt: "Circular glass grid pattern" },
      ],
    },
    {
      organization: "Design Engineering",
      year: "2025",
      title: "Font Craft Lab",
      description: [
        "Idea to code with Figma Make.",
        "The initial idea is to decorate the letter and give typography another layer of expression. Build a tool, design the pattern, and code with AI in a week.",
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
      organization: "Time in London",
      year: "2024",
      title: "Pop-up Supper Club",
      description: ["Planned out the events with chef friends, got the chance to work in a very hectic but loving back kitchen."],
      images: [
        {
          src: "/pic/project/DSC09126.JPEG",
          alt: "Dinner table scene",
          orientation: "portrait",
        },
        {
          src: "/pic/project/DSC09128.jpg",
          alt: "Plating dishes",
          orientation: "square",
        },
        {
          src: "/pic/project/DSCF8650.JPG",
          alt: "Grilled dish",
          orientation: "portrait",
        },
        {
          src: "/pic/project/DSCF8708.JPG",
          alt: "Soup pour",
          orientation: "portrait",
        },
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
    <div>
      <SharedHeader />
      <MainTabs />
      <div className="space-y-16 mt-8">
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
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {project.organization}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {project.year}
              </span>
            </div>

            {/* Title */}
            {project.title === "Glass Grid Generator" ? (
              <p className="font-semibold mb-2 dark:text-white">
                <Link
                  href="https://www.figma.com/community/plugin/1529554475751832749/glass-window-grid-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-[#7E7A84]"
                >
                  {project.title}
                </Link>
              </p>
            ) : project.title === "Font Craft Lab" ? (
              <p className="font-semibold mb-2 dark:text-white">
                <Link
                  href="https://font-craft-lab.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-[#7E7A84]"
                >
                  {project.title}
                </Link>
              </p>
            ) : project.title === "Keyboard Canvas" ? (
              <p className="font-semibold mb-2 dark:text-white">
                <Link
                  href="https://keyboard-canvas.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-[#7E7A84]"
                >
                  {project.title}
                </Link>
              </p>
            ) : (
              <p className="font-semibold mb-2 dark:text-white">
                {project.title}
              </p>
            )}

            {/* Description */}
            <div className="space-y-2">
              {project.description.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Images Grid */}
            {project.title === "Pop-up Supper Club" ? (
              <div className="flex gap-4 mt-6">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer overflow-hidden rounded-lg"
                    style={{
                      height: "192px",
                      flex:
                        image.orientation === "square" ? "3 1 0%" : "2 1 0%",
                    }}
                    onClick={() =>
                      setSelectedProject({ images: project.images, index })
                    }
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`grid ${
                  project.title === "Good Nut Butter"
                    ? "grid-cols-4"
                    : "grid-cols-3"
                } gap-4 mt-6`}
              >
                {project.title === "Good Nut Butter" ? (
                  <>
                    <div className="col-span-4 h-full grid grid-cols-4 gap-4">
                      {project.images.slice(0, 4).map((image, index) => (
                        <div
                          key={index}
                          className="aspect-[3/4] relative cursor-pointer"
                          onClick={() =>
                            setSelectedProject({
                              images: project.images,
                              index,
                            })
                          }
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
                      onClick={() =>
                        setSelectedProject({ images: project.images, index })
                      }
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
            )}
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
