"use client";

import React, { useState, useEffect, useRef } from "react";

// Module-level flag - resets on full page refresh, persists during client navigation
let hasAnimatedThisPageLoad = false;

const disciplines = [
  { text: "Software", color: "#F8961E" },
  { text: "Motion", color: "#E7B00C" },
  { text: "Furniture", color: "#90BE6D" },
  { text: "Graphics", color: "#43AA8B" },
  { text: "Photography", color: "#4D908E" },
  { text: "Gastronomy", color: "#577590" },
];

const animatedPhrase = "channel it into everything I create";

const getGradientColor = (progress: number): string => {
  if (progress <= 0.33) {
    const localProgress = progress / 0.33;
    const r = Math.round(248 + (231 - 248) * localProgress);
    const g = Math.round(150 + (176 - 150) * localProgress);
    const b = Math.round(30 + (12 - 30) * localProgress);
    return `rgb(${r}, ${g}, ${b})`;
  } else if (progress <= 0.66) {
    const localProgress = (progress - 0.33) / 0.33;
    const r = Math.round(231 + (144 - 231) * localProgress);
    const g = Math.round(176 + (190 - 176) * localProgress);
    const b = Math.round(12 + (109 - 12) * localProgress);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const localProgress = (progress - 0.66) / 0.34;
    const r = Math.round(144 + (77 - 144) * localProgress);
    const g = Math.round(190 + (144 - 190) * localProgress);
    const b = Math.round(109 + (142 - 109) * localProgress);
    return `rgb(${r}, ${g}, ${b})`;
  }
};

export default function SharedHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const animatedRef = useRef<HTMLSpanElement>(null);

  // Rotating discipline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % disciplines.length);
        setIsVisible(true);
      }, 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Gradient text animation - plays on page refresh, not on tab navigation
  useEffect(() => {
    const element = animatedRef.current;
    if (!element) return;

    const chars = animatedPhrase.split("");

    // If already animated this page load, show final state immediately
    if (hasAnimatedThisPageLoad) {
      element.innerHTML = chars
        .map((char, i) => {
          const progress = i / (chars.length - 1);
          const finalColor = getGradientColor(progress);
          return `<span style="color: ${finalColor}">${char}</span>`;
        })
        .join("");
      return;
    }

    // Create spans for each character with staggered transition delays
    element.innerHTML = chars
      .map((char, i) => {
        const progress = i / (chars.length - 1);
        const delay = i * 0.03; // 30ms stagger between characters
        const finalColor = getGradientColor(progress);
        return `<span data-char-index="${i}" data-final-color="${finalColor}" style="color: inherit; transition: color 0.4s ease ${delay}s">${char}</span>`;
      })
      .join("");

    // Trigger the glow animation after a brief moment
    const startDelay = setTimeout(() => {
      chars.forEach((_, i) => {
        const span = element.querySelector(`[data-char-index="${i}"]`) as HTMLElement;
        if (span) {
          const finalColor = span.getAttribute('data-final-color');
          if (finalColor) {
            span.style.color = finalColor;
          }
        }
      });
      hasAnimatedThisPageLoad = true;
    }, 100);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="space-y-6">
      {/* Profile */}
      <div className="space-y-2">
        <h1 className="text-lg font-semibold dark:text-white">Zicheng Gu</h1>
        <p className="text-gray-800 dark:text-gray-400">
          Designer around the 🌍
        </p>
      </div>

      {/* About Section */}
      <section>
        <p className="text-gray-800 dark:text-gray-400 leading-relaxed">
          I am a product designer curious about every dimension of design:{" "}
          <span
            className="font-semibold transition-opacity duration-200"
            style={{
              color: disciplines[currentIndex].color,
              opacity: isVisible ? 1 : 0,
            }}
          >
            {disciplines[currentIndex].text}
          </span>
          .
          <br />
          Design is how I make sense of the world, and I{" "}
          <span ref={animatedRef}>{animatedPhrase}</span>.
        </p>
      </section>

    </div>
  );
}
