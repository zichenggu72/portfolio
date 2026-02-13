"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import SharedHeader from "./components/SharedHeader";
import MainTabs from "./components/MainTabs";
const sale4 = "/pic/works/proponent.png";
import service4 from "./assets/images/hero33.jpg";
import task4 from "./assets/images/hero22.jpg";

const works = [
  {
    id: "sales",
    dateRange: "2024",
    title: "B2B SaaS - Sales tool",
    description: "Proponent",
    details: ["Conversational AI", "0 to 1 product design owner", "Systematical design components", "Branding and Marketing"],
    projectUrl: "#",
    images: [{ src: sale4, alt: "Proponent Example 1" }],
  },
  {
    id: "integration",
    dateRange: "2023",
    title: "B2B SaaS - Cloud",
    description: "VMware Cloud",
    details: ["Business model transformation", "Integrated cloud services", "Reduce time-to-value"],
    projectUrl: "#",
    images: [{ src: task4, alt: "VMware Cloud Service Integration Example 1" }],
  },
  {
    id: "monitor",
    dateRange: "2023",
    title: "B2B SaaS - Design System",
    description: "VMware Cloud",
    details: ["Long running task monitor", "Incremental solution", "Scalable design system"],
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
                      {...(typeof work.images[0].src !== 'string' ? { placeholder: "blur" } : {})}
                      className="object-cover rounded-lg border border-gray-100 dark:border-gray-800"
                    />
                  </div>
                </div>

                {/* Description - right side */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Description - product name + year */}
                  <div className={`flex items-baseline gap-2 mb-2 transition-colors duration-200
                    ${work.id === "sales" ? "group-hover:text-[#F8961E]" : ""}
                    ${work.id === "integration" ? "group-hover:text-[#A7A622]" : ""}
                    ${work.id === "monitor" ? "group-hover:text-[#59829E]" : ""}`}
                  >
                    <span className="font-semibold dark:text-white">{work.description}</span>
                    <span className="font-normal text-gray-400 dark:text-gray-500">{work.dateRange}</span>
                  </div>

                  {/* Details paragraph */}
                  {Array.isArray(work.details) ? (
                    <div className="text-gray-600 dark:text-gray-400 mb-2">
                      {work.details.map((item, i) => (
                        <div key={i}>• {item}</div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {work.details}
                    </p>
                  )}
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
