'use client';

import React, { useState, useEffect } from 'react';
import { ArrowBendUpLeft, ArrowBendUpRight, ArrowClockwise, ArrowCounterClockwise, DownloadSimple } from '@phosphor-icons/react';
import Link from 'next/link';

interface StrokePoint {
  row: number;
  col: number;
  oldColor: string;
  newColor: string;
}

export default function VisitorsPage() {
  const GRID_SIZE = 22;
  const COLORS = [
    '#D26064', // Deep burgundy
    '#F8961E', // Coral red
    '#F9C74F', // Golden yellow
    '#9BA65D', // Teal
    '#59829E', // Forest green
    '#A6B8C7', // Steel blue
    '#B5A6C7', // Burnt orange
    '#7E7A84', // Terra cotta
    '#F1EEE3'  // Olive green
  ];
  const MAX_PIXELS_PER_IP = Math.floor((GRID_SIZE * GRID_SIZE) / 4);

  const createInitialGrid = (): string[][] => 
    Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill('#FFFFFF')
    );
  
  const [grid, setGrid] = useState<string[][]>(createInitialGrid());
  const [currentColor, setCurrentColor] = useState('#F5f5f5');
  const [hasSelectedColor, setHasSelectedColor] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[][][]>([createInitialGrid()]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStroke, setCurrentStroke] = useState<Array<{row: number, col: number, prevColor: string}>>([]);
  const [isCollaborative, setIsCollaborative] = useState(true);
  const [pixelsDrawn, setPixelsDrawn] = useState(0);
  const [visitorCount, setVisitorCount] = useState(1);
  const MAX_VISITORS = 10;
  const [visitorId] = useState(`visitor-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    trackVisitor();
    loadCanvas();
  }, []);

  useEffect(() => {
    setGrid(createInitialGrid());
    setHistory([createInitialGrid()]);
    setCurrentStep(0);
    setPixelsDrawn(0);
  }, [isCollaborative]);

  const colorPixel = (row: number, col: number) => {
    if (!hasSelectedColor || grid[row][col] !== '#FFFFFF') return;

    // Create new grid with the change
    const newGrid = grid.map(row => [...row]);
    newGrid[row][col] = currentColor;
    setGrid(newGrid);

    // Update history
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(newGrid.map(row => [...row])); // Deep copy the new grid
    setHistory(newHistory);
    setCurrentStep(currentStep + 1);

    // Backend save (unchanged)
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation {
            addPixel(x: ${col}, y: ${row}, color: "${currentColor}", visitorId: "${visitorId}") {
              x
              y
              color
            }
          }
        `
      }),
    }).catch(error => console.error('Error saving pixel:', error));
  };

  const loadCanvas = async () => {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              activeCanvas {
                id
                pixels {
                  x
                  y
                  color
                }
                visitorCount
              }
            }
          `
        }),
      });
  
      const { data } = await response.json();
      if (data?.activeCanvas) {
        // Create fresh grid
        const newGrid = createInitialGrid();
      
        // Only apply pixels from current canvas
        data.activeCanvas.pixels.forEach((pixel: any) => {
          newGrid[pixel.y][pixel.x] = pixel.color;
        });
        setGrid(newGrid);
        setVisitorCount(data.activeCanvas.visitorCount);
        
        // Reset history when loading new canvas
        setHistory([]);
        setCurrentStep(0);
        setPixelsDrawn(0);
      }
    } catch (error) {
      console.error('Error loading canvas:', error);
    }
  };

  const createNewCanvas = async () => {
    try {
      await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              createNewCanvas {
                id
              }
            }
          `
        }),
      });
      setGrid(createInitialGrid());
      setVisitorCount(1);
    } catch (error) {
      console.error('Error creating new canvas:', error);
    }
  };

  const commitStroke = () => {
    if (currentStroke.length > 0) {
      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push(grid.map(row => [...row]));
      setHistory(newHistory);
      setCurrentStep(prev => prev + 1);
      setCurrentStroke([]); // Clear current stroke
    }
    setIsDrawing(false);
  };

  const undo = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setGrid(history[prevStep].map(row => [...row])); // Deep copy the previous grid
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setGrid(history[nextStep].map(row => [...row])); // Deep copy the next grid
    }
  };

  const downloadCanvas = () => {
    const jsonString = JSON.stringify(grid);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'canvas.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const trackVisitor = async () => {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation {
              trackVisitor(visitorId: "${visitorId}")
            }
          `
        }),
      });
      const { data } = await response.json();
      return data?.trackVisitor;
    } catch (error) {
      console.error('Error tracking visitor:', error);
      return false;
    }
  };

  // const restartCanvas = () => {
  //   setGrid(createInitialGrid());
  //   setHistory([createInitialGrid()]);
  //   setCurrentStep(0);
  // };

  return (
    <div className="w-full max-w-[680px] mx-auto px-4">
      <h1 className="font-semibold mb-6">Visitors</h1>
      
      <div className="text-gray-600 mb-4">
        {visitorCount}/10 artists have joined this canvas
      </div>
      
      <div className="mb-4 text-gray-900">
        Welcome to our collaborative canvas! Each visitor adds their unique touch, building on what came before, before passing the brush to the next artist.
        <br />
        The canvas resets after {MAX_VISITORS} visitors. Ready to leave your stroke?
      </div>

      <div 
        className="w-full flex flex-col items-start gap-4"
        onMouseUp={commitStroke}
        onMouseLeave={commitStroke}
      >
        {/* Action Buttons - Centered above canvas */}
        <div className="flex gap-4 justify-center w-full">
          <button 
            onClick={undo}
            disabled={currentStep <= 0}
            className="p-2 rounded disabled:opacity-50 transition-colors hover:bg-gray-100"
          >
            <ArrowBendUpLeft size={20} />
          </button>
          <button 
            onClick={redo}
            disabled={currentStep >= history.length - 1}
            className="p-2 rounded disabled:opacity-50 transition-colors hover:bg-gray-100"
          >
            <ArrowBendUpRight size={20} />
          </button>
          
          {/* <button 
            onClick={restartCanvas}
            className="p-2 rounded disabled:opacity-50 transition-colors hover:bg-gray-100"
          >
            <ArrowCounterClockwise size={20} />
          </button> */}

          
        </div>
        
        {/* Grid and Color Palette Container */}
        <div className="flex gap-4">
          {/* Grid */}
          <div className="border-none">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((color, colIndex) => (
                  <div
                    key={colIndex}
                    className="w-5 h-5 cursor-pointer border-[0.5px] border-gray-200 rounded m-[2px]"
                    style={{ backgroundColor: color }}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent default selection
                      setIsDrawing(true);
                      colorPixel(rowIndex, colIndex);
                    }}
                    onMouseEnter={(e) => {
                      e.preventDefault(); // Prevent default selection
                      if (isDrawing) {
                        colorPixel(rowIndex, colIndex);
                      }
                    }}
                    onMouseUp={() => {
                      setIsDrawing(false);
                      commitStroke();
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Color Palette - Vertical layout */}
          <div className="flex flex-col gap-2">
            {COLORS.map((color) => (
              <div
                key={color}
                className={`w-6 h-6 cursor-pointer border border-gray-200 rounded ${currentColor === color ? 'ring-2 ring-blue-500' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setCurrentColor(color);
                  setHasSelectedColor(true);
                }}
              />
            ))}
            <input
              type="color"
              value={currentColor}
              onChange={(e) => {
                setCurrentColor(e.target.value);
                setHasSelectedColor(true);
              }}
              className="w-6 h-6 cursor-pointer"
              style={{ 
                padding: 1,
                border: '2px solid white',
                borderRadius: '0.25rem',
                background: 'white',
                boxShadow: '0 0 0 1px #e5e7eb',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
            />
          </div>
        </div>

        {/* Mode Switch Button
        <button
          onClick={() => setIsCollaborative(!isCollaborative)}
          className="mt-2 text-gray-400 hover:text-gray-600 self-center"
        >
          {isCollaborative 
            ? "I'd rather have my own canvas" 
            : "Back to joint canvas"}
        </button> */}
      </div>

      {/* After the canvas grid */}
      <div className="mt-4 flex justify-start">
        <Link 
          href="/n/hall-of-fame" 
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Canvas Hall →
        </Link>
      </div>
    </div>
  );
}