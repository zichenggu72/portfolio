"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import SharedHeader from "./components/SharedHeader";
import MainTabs from "./components/MainTabs";
import sale4 from "./assets/images/hero11.jpg";
import service4 from "./assets/images/hero33.jpg";
import task4 from "./assets/images/hero22.jpg";

const works = [
  {
    id: "sales",
    dateRange: "2024",
    title: "B2B SaaS - Sales tool",
    description: "Conversation Intelligence to Sales Success",
    details:
      "As the founding designer, I shaped the entire user experience. Build a cohesive product that empower sales teams and product marketing managers.",
    projectUrl: "#",
    images: [{ src: sale4, alt: "Proponent Example 1" }],
  },
  {
    id: "integration",
    dateRange: "2023",
    title: "B2B SaaS",
    description: "Unified workflow to augment cloud capabilities",
    details:
      "To support the new business requirement (license to subscription mode transition), I designed a cloud service integration strategy that reduce the time-to-value.",
    projectUrl: "#",
    images: [{ src: task4, alt: "VMware Cloud Service Integration Example 1" }],
  },
  {
    id: "monitor",
    dateRange: "2023",
    title: "Design System",
    description: "Uncover a hidden behavior to facilitate task monitoring",
    details:
      "Designed phased solutions for VMware's core task monitoring system, a critical component used across products by millions of users. The strategy balanced quick implementation needs with long-term scalability.",
    projectUrl: "#",
    images: [{ src: service4, alt: "VMware Cloud Task Monitor Example 1" }],
  },
];

const HomePage = () => {
  return (
    <div>
      <SharedHeader />
      <MainTabs />

      {/* Works Section */}
      <div className="space-y-space-500 leading-relaxed mt-space-400">
        {works.map((work, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/n/works/${work.id}`}
              className="group block -mx-2 px-2 py-2 rounded-lg cursor-pointer transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:translate-x-1"
            >
              <div className="flex gap-8">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="w-[493px] aspect-video relative overflow-hidden rounded-lg">
                    <Image
                      src={work.images[0].src}
                      alt={work.images[0].alt}
                      fill
                      sizes="493px"
                      priority={index === 0}
                      placeholder="blur"
                      className="object-cover rounded-lg border border-gray-100 dark:border-gray-800"
                    />
                  </div>
                </div>

                {/* Description - right side */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Title and Date row */}
                  <div className="mb-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                      {work.title} · {work.dateRange}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className={`font-semibold mb-2 transition-colors duration-200 dark:text-white
                    ${work.id === "sales" ? "group-hover:text-[#F8961E]" : ""}
                    ${work.id === "integration" ? "group-hover:text-[#A7A622]" : ""}
                    ${work.id === "monitor" ? "group-hover:text-[#59829E]" : ""}`}
                  >
                    {work.description}
                  </p>

                  {/* Details paragraph */}
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {work.details}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default memo(HomePage);
