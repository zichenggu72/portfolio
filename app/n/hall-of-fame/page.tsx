'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Canvas {
  id: string;
  pixels: Array<{
    x: number;
    y: number;
    color: string;
  }>;
  visitorCount: number;
  lastUpdated: string;
}

export default function HallOfFamePage() {
  const [completedCanvases, setCompletedCanvases] = useState<Canvas[]>([]);
  const GRID_SIZE = 40;

  useEffect(() => {
    const fetchCompletedCanvases = async () => {
      try {
        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                completedCanvases {
                  id
                  pixels {
                    x
                    y
                    color
                  }
                  visitorCount
                  lastUpdated
                }
              }
            `
          }),
        });

        const { data } = await response.json();
        if (data?.completedCanvases) {
          setCompletedCanvases(data.completedCanvases);
        }
      } catch (error) {
        console.error('Error fetching completed canvases:', error);
      }
    };

    fetchCompletedCanvases();
  }, []);

  const renderCanvas = (canvas: Canvas) => {
    const grid = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill('#FFFFFF')
    );

    canvas.pixels.forEach(pixel => {
      grid[pixel.y][pixel.x] = pixel.color;
    });

    return (
      <div key={canvas.id} className="mb-8">
        <div className="bg-white p-4">
          <div className="text-sm text-gray-500 mb-2">
            {canvas.visitorCount} artists • {new Date(canvas.lastUpdated).toLocaleDateString()}
          </div>
          <div className="border-none">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((color, colIndex) => (
                  <div
                    key={colIndex}
                    className="w-4 h-4 border-[0.5px] border-gray-200 rounded m-[1px]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[680px] mx-auto px-4">
      <div className="font-semibold mb-6">
        Canvas Hall
      </div>
      
   

      {completedCanvases.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No completed canvases yet. Be the first to create one!
        </div>
      ) : (
        <div className="space-y-8">
          {completedCanvases.map(renderCanvas)}
        </div>
      )}

<div className="mt-4 flex justify-start">
        <Link 
          href="/n/visitors" 
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Back to Canvas  
        </Link>
      </div>
    </div>
  );
} 