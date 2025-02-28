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
  const [isLoading, setIsLoading] = useState(true);
  const GRID_SIZE = 23;

  useEffect(() => {
    const fetchCompletedCanvases = async () => {
      try {
        setIsLoading(true);
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
                  completed
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedCanvases();
  }, []);

  const deleteCanvas = async (canvasId: string) => {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation {
              deleteCompletedCanvas(id: "${canvasId}")
            }
          `
        }),
      });

      const { data, errors } = await response.json();
      console.log('Delete response:', data, errors);

      if (data?.deleteCompletedCanvas) {
        setCompletedCanvases(prevCanvases => 
          prevCanvases.filter(canvas => canvas.id !== canvasId)
        );
        alert('Canvas deleted successfully');
      } else if (errors) {
        console.error('GraphQL errors:', errors);
        alert('Failed to delete canvas: ' + errors[0]?.message);
      }
    } catch (error) {
      console.error('Error deleting canvas:', error);
      alert('Failed to delete canvas. Please try again.');
    }
  };

  const renderCanvas = (canvas: Canvas) => {
    const grid = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill('#FFFFFF')
    );

    canvas.pixels.forEach(pixel => {
      grid[pixel.y][pixel.x] = pixel.color;
    });

    const formattedDate = new Date(canvas.lastUpdated).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return (
      <div key={canvas.id} className="mb-8 relative group">
        <div className="bg-white">
          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <span>{canvas.visitorCount} artists • {formattedDate}</span>
            {/* <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this canvas?')) {
                  deleteCanvas(canvas.id);
                }
              }}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs transition-opacity"
            >
              Delete
            </button> */}
          </div>
          <div className="border-none origin-top-left">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((color, colIndex) => (
                  <div
                    key={colIndex}
                    className="w-2.5 h-2.5 border-[0.5px] border-gray-200 rounded m-[0.5px]"
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
    <div className="w-full max-w-[680px] mx-auto">
      <div className="font-semibold mb-6 flex justify-between items-center">
        <span>Canvas Hall</span>
       
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : completedCanvases.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No completed canvases yet. Be the first to create one!
        </div>
      ) : (
        <div className="grid grid-cols-2">
          {completedCanvases.map(renderCanvas)}
        </div>
      )}

      <div className="mt-2 flex justify-start">
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