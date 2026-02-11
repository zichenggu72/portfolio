"use client";

import { FaLinkedin, FaInstagram, FaGithub, FaXTwitter } from "react-icons/fa6";
import { BsCalendar3 } from "react-icons/bs";
import { oorangeregular } from "../fonts";

const links = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/gudesign",
    icon: FaLinkedin,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/zichengguu",
    icon: FaInstagram,
  },
  { label: "GitHub", href: "https://github.com/zichenggu72", icon: FaGithub },
  { label: "X", href: "https://x.com/ZichengGu", icon: FaXTwitter },
  {
    label: "Chat with me",
    href: "https://calendar.app.google/2ikrw6QDYCUoekRL7",
    icon: BsCalendar3,
  },
];

export default function FooterContent() {
  return (
    <div className="max-w-[866px] mx-auto px-8">
      <section className="mt-16">
        <h2 className="font-semibold mb-2 dark:text-white">
          Find me elsewhere
        </h2>

        <div className="flex items-center gap-3 flex-wrap">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label={link.label}
                title={link.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </section>

      {/* Status Update */}
      <div className="bg-[#F8F8F8] dark:bg-[#2b2b2b] p-4 rounded-lg mt-12">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Updated Feb 4, 2026
        </p>
        <p className={`${oorangeregular.className} text-xl dark:text-gray-100`}>
          If taste is just personal preference, then there's no way to get
          better at your job. But you do get better — which means your old taste
          was worse, not just different.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
          ↑ This is my real handwriting font 🤗
        </p>
      </div>
    </div>
  );
}
