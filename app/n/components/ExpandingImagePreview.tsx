"use client";
import { useEffect, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageZoomProps {
  isOpen: boolean;
  onClose: () => void;
  image: { src: string; alt: string };
  sourceRect: DOMRect | null;
  sourceRotation?: number;
}

interface AnimationState {
  source: { top: number; left: number; width: number; height: number; rotate: number };
  target: { top: number; left: number; width: number; height: number; rotate: number };
}

export default function ImageZoom({
  isOpen,
  onClose,
  image,
  sourceRect,
  sourceRotation = 0,
}: ImageZoomProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isOverImage, setIsOverImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const animationState = useRef<AnimationState | null>(null);
  const wasOpen = useRef(false);

  // Reset loading state when image changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, image.src]);

  // Calculate and store positions synchronously when modal opens
  if (isOpen && sourceRect && !wasOpen.current) {
    const aspectRatio = sourceRect.width / sourceRect.height;
    const maxWidth = window.innerWidth * 0.65;
    const maxHeight = window.innerHeight * 0.65;

    let width: number, height: number;
    if (aspectRatio > maxWidth / maxHeight) {
      width = Math.min(maxWidth, 1200);
      height = width / aspectRatio;
    } else {
      height = Math.min(maxHeight, 900);
      width = height * aspectRatio;
    }

    animationState.current = {
      source: {
        top: sourceRect.top,
        left: sourceRect.left,
        width: sourceRect.width,
        height: sourceRect.height,
        rotate: sourceRotation,
      },
      target: {
        top: (window.innerHeight - height) / 2,
        left: (window.innerWidth - width) / 2,
        width,
        height,
        rotate: 0,
      },
    };
    wasOpen.current = true;
  } else if (!isOpen && wasOpen.current) {
    // Reset after close animation completes
    wasOpen.current = false;
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const state = animationState.current;

  return (
    <AnimatePresence>
      {isOpen && state && (
        <>
          {/* Blurred backdrop - light mode */}
          <motion.div
            className="fixed inset-0 z-40 dark:hidden"
            initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(255,255,255,0)" }}
            animate={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255,255,255,0.2)" }}
            exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(255,255,255,0)" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            onClick={onClose}
            onMouseMove={handleMouseMove}
            style={{ cursor: "none" }}
          />

          {/* Blurred backdrop - dark mode */}
          <motion.div
            className="fixed inset-0 z-40 hidden dark:block"
            initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.3)" }}
            exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            onClick={onClose}
            onMouseMove={handleMouseMove}
            style={{ cursor: "none" }}
          />

          {/* Floating close text */}
          {!isOverImage && (
            <motion.div
              className="fixed pointer-events-none z-[60] text-gray-800 dark:text-white text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                left: cursorPos.x + 12,
                top: cursorPos.y + 12,
              }}
            >
              close
            </motion.div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              className="fixed z-[55] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                top: state.target.top,
                left: state.target.left,
                width: state.target.width,
                height: state.target.height,
              }}
            >
              <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300 rounded-full animate-spin" />
            </motion.div>
          )}

          {/* The image itself - animates from source position to center */}
          <motion.img
            src={image.src}
            alt={image.alt}
            className="fixed z-50 rounded-[8px] object-cover pointer-events-auto"
            initial={state.source}
            animate={state.target}
            exit={state.source}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onLoad={() => setIsLoading(false)}
            onMouseEnter={() => setIsOverImage(true)}
            onMouseLeave={() => setIsOverImage(false)}
            onClick={onClose}
            style={{ cursor: "pointer", opacity: isLoading ? 0.5 : 1 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
