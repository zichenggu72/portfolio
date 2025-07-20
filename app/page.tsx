"use client";

import React, { useEffect, useRef, memo } from 'react';

// Mock font - replace with your actual font import
import { oorangeregular } from "./fonts";

const HomePage = () => {
  interface Match {
    node: Text;
    charIndex: number;
    globalIndex: number;
    char: string;
    keywordIndex: number;
    positionInKeyword: number;
    keywordLength: number;
  }

  const contentRef = useRef<HTMLDivElement>(null);
  const matchesRef = useRef<Match[]>([]);
  const effectRan = useRef(false);
  
  const links = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/gudesign' },
    { label: 'Instagram', href: 'https://instagram.com/zichengguu' },
    { label: 'GitHub', href: 'https://github.com/zichenggu72' },
    { label: 'Bluesky', href: 'https://bsky.app/profile/zichenggu.bsky.social' },
    { label: 'X', href: 'https://x.com/ZichengGu' },
    { label: 'Chat with me', href: 'https://calendar.app.google/2ikrw6QDYCUoekRL7' }

  ];
  
  const keywords = [
    'furniture',
    'graphics and print',
    'photography',
    'gastronomy',
    'objects',
    'I create digital products that not only solve problems but enrich lives, leaving people inspired and eager to explore further',
    'creating a space I\'m eager to revisit and enhance',
    'whether you are a stranger, a friend, or somewhere in between – welcome! Make yourself comfortable at my digital home.'
  ];

  useEffect(() => {
    // Add a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      console.log('Starting animation setup');
      const contentElement = contentRef.current; 
      if (!contentElement) {
        console.log('No content element found');
        return;
      }

      // Get all text nodes in the content
      const textNodes: Text[] = [];
      const walker = document.createTreeWalker(
        contentElement,
        NodeFilter.SHOW_TEXT,
        null,
      );

      let node;
      while (node = walker.nextNode()) {
        if (node.textContent?.trim()) {
          textNodes.push(node);
        }
      }

      console.log('Found text nodes:', textNodes.length);

      // Find all matches for keywords
      const allMatches: Match[] = [];
      let globalCharIndex = 0;

      textNodes.forEach(textNode => {
        const text = textNode.textContent ?? '';
        
        keywords.forEach((keyword, keywordIndex) => {
          const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
          let match;
          
          while ((match = regex.exec(text)) !== null) {
            for (let i = 0; i < keyword.length; i++) {
              allMatches.push({
                node: textNode,
                charIndex: match.index + i,
                globalIndex: globalCharIndex + match.index + i,
                char: keyword[i],
                keywordIndex: keywordIndex,
                positionInKeyword: i,
                keywordLength: keyword.length
              });
            }
          }
        });
        
        globalCharIndex += text.length;
      });

      console.log('Found matches:', allMatches.length);

      // Sort matches by global position
      allMatches.sort((a, b) => a.globalIndex - b.globalIndex);

      // Remove duplicates
      const uniqueMatches = allMatches.filter((match, index) => {
        return index === 0 || match.globalIndex !== allMatches[index - 1].globalIndex;
      });

      console.log('Unique matches:', uniqueMatches.length);

      // Process each text node to add spans
      const processedNodes = new Set();
      
      uniqueMatches.forEach(match => {
        if (processedNodes.has(match.node)) return;
        
        const textNode = match.node;
        const text = textNode.textContent ?? '';
        const parent = textNode.parentNode;
        
        // Find all matches in this text node
        const nodeMatches = uniqueMatches.filter(m => m.node === textNode);
        
        if (nodeMatches.length === 0) return;
        
        // Create new content with spans
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        
        nodeMatches.forEach(match => {
          // Add text before the match
          if (match.charIndex > lastIndex) {
            const beforeText = text.slice(lastIndex, match.charIndex);
            fragment.appendChild(document.createTextNode(beforeText));
          }
          
          // Create span for the character
          const span = document.createElement('span');
          span.textContent = match.char;
          span.setAttribute('data-char-index', match.globalIndex.toString());
          span.setAttribute('data-keyword-index', match.keywordIndex.toString());
          span.setAttribute('data-match-position', match.positionInKeyword.toString());
          span.setAttribute('data-match-total', match.keywordLength.toString());
          span.style.transition = 'all 0.3s ease';
          fragment.appendChild(span);
          
          lastIndex = match.charIndex + 1;
        });
        
        // Add remaining text
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        
        // Replace the text node
        parent?.replaceChild(fragment, textNode);
        processedNodes.add(textNode);
      });

      // Start the animation
      let currentIndex = 0;
      
      const highlightInterval = setInterval(() => {
        if (currentIndex >= uniqueMatches.length) {
          clearInterval(highlightInterval);
          return;
        }

        const match = uniqueMatches[currentIndex];
        const span = contentElement.querySelector(`[data-char-index="${match.globalIndex}"]`);
        
        if (span) {
          // Apply gradient effect
          const position = parseInt(span.getAttribute('data-match-position') ?? '0');
          const total = parseInt(span.getAttribute('data-match-total') ?? '0');
          const progress = position / (total - 1);
          
          // Calculate color based on gradient position
          let color;
          if (progress <= 0.33) {
            // Between orange and yellow
            const localProgress = progress / 0.33;
            const r = Math.round(248 + (231 - 248) * localProgress);
            const g = Math.round(150 + (176 - 150) * localProgress);
            const b = Math.round(30 + (12 - 30) * localProgress);
            color = `rgb(${r}, ${g}, ${b})`;
          } else if (progress <= 0.66) {
            // Between yellow and green
            const localProgress = (progress - 0.33) / 0.33;
            const r = Math.round(231 + (144 - 249) * localProgress);
            const g = Math.round(176 + (190 - 199) * localProgress);
            const b = Math.round(12 + (109 - 79) * localProgress);
            color = `rgb(${r}, ${g}, ${b})`;
          } else {
            // Between green and teal
            const localProgress = (progress - 0.66) / 0.34;
            const r = Math.round(144 + (77 - 144) * localProgress);
            const g = Math.round(190 + (144 - 190) * localProgress);
            const b = Math.round(109 + (142 - 109) * localProgress);
            color = `rgb(${r}, ${g}, ${b})`;
          }
          
          (span as HTMLElement).style.color = color;
          (span as HTMLElement).style.textShadow = `0 0 20px ${color}40`;
        }
        
        currentIndex++;
      }, 42);

      return () => {
        clearInterval(highlightInterval);
        clearTimeout(timeoutId);
      };
    }, 0); // No delay needed, but keeping timeoutId for cleanup

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={contentRef} className="space-y-12">
      {/* Profile */}
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Zicheng Gu</h1>
        <p className="text-gray-800">Designer around the 🌍</p>
      </div>

      {/* About Section */}
      <section>
        <h2 className="font-semibold mb-2">About me</h2>
        <div className="space-y-4 text-gray-800 leading-relaxed">
          <p>I am a product designer with curiosity in the vast spectrum of design — from the elegant forms of furniture to the visual allure of graphics and print, the storytelling power of photography, the artistry of gastronomy, and industrial objects infused with personality.</p>
          <p>This multifaceted approach to design fuels my work in the digital realm. I aspire to create software experiences that resonate on a human level.</p>
          <p>Through a blend of aesthetics, functionality, and empathy, I create digital products that not only solve problems but enrich lives, leaving people inspired and eager to explore further.</p>
        </div>
      </section>

      {/* This Site Section */}
      <section>
        <h2 className="font-semibold mb-2">This Site</h2>
        <div className="space-y-4 text-gray-800 leading-relaxed">
          <p>I built this site to transform my aversion to portfolio updates into a passion for continuous learning and sharing, creating a space I'm eager to revisit and enhance. By showcasing everything I'm passionate about to a broader audience, I strive to inspire others while holding myself accountable to high standards of creativity and growth.</p>
          <p>This site is curated with the same care and personality I'd put into designing my home. It's a space that reflects who I am and what I do.</p>
          <p>I've always found it fascinating to get to know someone through a well-maintained personal website. So whether you are a stranger, a friend, or somewhere in between – welcome! Make yourself comfortable at my digital home.</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-semibold mb-2">Find me elsewhere</h2>
        
        <div className="flex items-center space-x-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* Status Update */}
      <div className="bg-[#F8F8F8] p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Updated May 18, 2025</p>
        <p className={`${oorangeregular.className} text-xl`}>
          Traveled to Spain, France, Italy, and Switzerland with my family. Each city we went to has its own charm and character, and weather was just perfect everyday. Such a blissful time.
        </p>
        <p className="text-sm text-gray-600 mt-4">↑ This is my real handwriting font 🤗</p>
      </div>
    </div>
  );
};

// Memoize the component
export default memo(HomePage, (prevProps, nextProps) => {
  // Since this component doesn't take any props, it will never re-render
  // unless its parent forces a re-render
  return true;
});