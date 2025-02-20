'use client';

import React, { useState, useEffect } from 'react';
import { ArrowBendUpLeft, ArrowBendUpRight, ArrowCounterClockwise } from '@phosphor-icons/react';
import Link from 'next/link';

const GRID_SIZE = 23;
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

// Storage keys
const PERSONAL_CANVAS_KEY = 'personalCanvasGrid';
const PERSONAL_CANVAS_HISTORY_KEY = 'personalCanvasHistory';
const PERSONAL_CANVAS_STEP_KEY = 'personalCanvasStep';

interface PixelMutation {
  x: number;
  y: number;
  color: string;
}

export default function PersonalCanvas() {
  const createInitialGrid = (): string[][] => 
    Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill('#FFFFFF')
    );

  // Initialize state with values from localStorage if they exist
  const [grid, setGrid] = useState<string[][]>(() => {
    if (typeof window === 'undefined') return createInitialGrid();
    const savedGrid = localStorage.getItem(PERSONAL_CANVAS_KEY);
    return savedGrid ? JSON.parse(savedGrid) : createInitialGrid();
  });
  
  const [currentColor, setCurrentColor] = useState('#F5f5f5');
  const [hasSelectedColor, setHasSelectedColor] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const [history, setHistory] = useState<string[][][]>(() => {
    if (typeof window === 'undefined') return [createInitialGrid()];
    const savedHistory = localStorage.getItem(PERSONAL_CANVAS_HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [createInitialGrid()];
  });
  
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const savedStep = localStorage.getItem(PERSONAL_CANVAS_STEP_KEY);
    return savedStep ? parseInt(savedStep, 10) : 0;
  });
  
  const [currentStroke, setCurrentStroke] = useState<Array<{row: number, col: number, prevColor: string}>>([]);
  const [visitorId, setVisitorId] = useState('');
  const [personalCanvasId, setPersonalCanvasId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize visitor ID
  useEffect(() => {
    const storedId = localStorage.getItem('visitorId');
    const newId = storedId || `visitor-${Math.random().toString(36).slice(2)}`;
    if (!storedId) {
      localStorage.setItem('visitorId', newId);
    }
    setVisitorId(newId);
    
    // Check for existing personal canvas
    const savedCanvasId = localStorage.getItem('personalCanvasId');
    if (savedCanvasId) {
      setPersonalCanvasId(savedCanvasId);
      // Load canvas from backend
      loadCanvasFromBackend(savedCanvasId);
    } else {
      // Create new personal canvas in backend
      createPersonalCanvas(newId);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(PERSONAL_CANVAS_KEY, JSON.stringify(grid));
  }, [grid]);

  useEffect(() => {
    localStorage.setItem(PERSONAL_CANVAS_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem(PERSONAL_CANVAS_STEP_KEY, currentStep.toString());
  }, [currentStep]);

  const loadCanvasFromBackend = async (canvasId: string) => {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              getPersonalCanvas(id: "${canvasId}") {
                id
                pixels {
                  x
                  y
                  color
                }
              }
            }
          `
        }),
      });
      
      const { data } = await response.json();
      if (data?.getPersonalCanvas?.pixels) {
        const newGrid = createInitialGrid();
        data.getPersonalCanvas.pixels.forEach((pixel: any) => {
          if (pixel.y < GRID_SIZE && pixel.x < GRID_SIZE) {
            newGrid[pixel.y][pixel.x] = pixel.color;
          }
        });
        setGrid(newGrid);
        setHistory([...history, newGrid]);
        setCurrentStep(history.length);
      }
    } catch (error) {
      console.error('Error loading canvas from backend:', error);
    }
  };

  const createPersonalCanvas = async (ownerId: string) => {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation {
              createPersonalCanvas(ownerId: "${ownerId}") {
                id
              }
            }
          `
        }),
      });
      
      const { data } = await response.json();
      if (data?.createPersonalCanvas?.id) {
        const newId = data.createPersonalCanvas.id;
        setPersonalCanvasId(newId);
        localStorage.setItem('personalCanvasId', newId);
      }
    } catch (error) {
      console.error('Error creating personal canvas:', error);
    }
  };

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

    // Send pixel to backend immediately (like collaborative canvas)
    if (visitorId) {
      const mutation = `mutation {
        addPixel(x: ${col}, y: ${row}, color: "${currentColor}", visitorId: "${visitorId}") {
          x
          y
          color
        }
      }`;

      fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
      }).catch((error) => console.error("Error saving pixel:", error));
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
      const prevGrid = history[prevStep];
      setGrid(prevGrid.map(row => [...row])); // Deep copy the previous grid
      
      // Update backend with the new state after undo
      updateBackendAfterUndo(prevGrid);
    }
  };

  const updateBackendAfterUndo = (currentGrid: string[][]) => {
    if (!visitorId) return;
    
    // Clear canvas on backend
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation {
            clearCanvas(visitorId: "${visitorId}")
          }
        `
      }),
    })
    .then(() => {
      // Re-add all non-white pixels
      for (let y = 0; y < currentGrid.length; y++) {
        for (let x = 0; x < currentGrid[y].length; x++) {
          if (currentGrid[y][x] !== '#FFFFFF') {
            const mutation = `mutation {
              addPixel(x: ${x}, y: ${y}, color: "${currentGrid[y][x]}", visitorId: "${visitorId}") {
                x
                y
                color
              }
            }`;
            
            fetch("/api/graphql", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ query: mutation }),
            }).catch((error) => console.error("Error updating pixel after undo:", error));
          }
        }
      }
    })
    .catch((error) => console.error("Error clearing canvas for undo:", error));
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const nextGrid = history[nextStep];
      setGrid(nextGrid.map(row => [...row])); // Deep copy the next grid
      
      // Update backend with the new state after redo
      updateBackendAfterUndo(nextGrid);
    }
  };

  const restartCanvas = async () => {
    const newGrid = createInitialGrid();
    setGrid(newGrid);
    setHistory([newGrid]);
    setCurrentStep(0);
    
    // Clear the localStorage for the personal canvas
    localStorage.removeItem(PERSONAL_CANVAS_KEY);
    localStorage.removeItem(PERSONAL_CANVAS_HISTORY_KEY);
    localStorage.removeItem(PERSONAL_CANVAS_STEP_KEY);
    
    // Clear on the backend
    if (visitorId) {
      try {
        await fetch('/api/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              mutation {
                clearCanvas(visitorId: "${visitorId}")
              }
            `
          }),
        });
      } catch (error) {
        console.error('Error clearing canvas on backend:', error);
      }
    }
  };

  const publishToHall = async () => {
    // Check if canvas is empty
    const hasPixels = grid.some(row => row.some(cell => cell !== '#FFFFFF'));
    
    if (!hasPixels) {
      alert('Please draw something before publishing to the collaborative canvas!');
      return;
    }
    
    // Backend save
    setIsSaving(true);
    try {
      const mutation = `mutation {
        saveCanvas(visitorId: "${visitorId}", isCollaborative: true)
      }`;
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
      });
      
      const result = await response.json();
      
      if (result.data && result.data.saveCanvas) {
        alert('Successfully published to the Canvas Hall!');
        
        // Reset canvas after successful publish
        const newGrid = createInitialGrid();
        setGrid(newGrid);
        setHistory([newGrid]);
        setCurrentStep(0);
        
        // Clear on backend
        await fetch('/api/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              mutation {
                clearCanvas(visitorId: "${visitorId}")
              }
            `
          }),
        });
        
      } else {
        alert('Failed to publish. Please try again.');
      }
    } catch (error) {
      console.error("Error publishing canvas:", error);
      alert('Failed to publish due to a network error. Please check your connection and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-[680px] mx-auto">
      <h1 className="font-semibold mb-6">Visitors</h1>

      <div className="flex gap-4 mb-6">
        <Link
          href="/n/visitors"
          className="text-sm px-3 py-1 rounded-md text-gray-400 hover:text-gray-600"
        >
          collaborative canvas
        </Link>
        <Link
          href="/n/visitors/personal"
          className="text-sm px-3 py-1 rounded-md text-gray-400 hover:text-gray-600 bg-gray-100 text-gray-700"
        >
          personal canvas
        </Link>
      </div>
      
      <div className="mb-4 text-gray-900">
        This is your personal canvas where you can experiment freely! 
        <br />
        Share your artwork with the others by publishing it to the Canvas Hall or just download it to keep it for yourself.
        {isSaving && <span className="ml-2 text-xs text-gray-400">(Saving...)</span>}
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
          
          <button 
            onClick={restartCanvas}
            className="p-2 rounded transition-colors hover:bg-gray-100"
            title="Clear canvas"
          >
            <ArrowCounterClockwise size={20} />
          </button>
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
      </div>

      <div className="mt-6 flex justify-start gap-[25.5rem]">
        <Link 
          href="/n/hall-of-fame" 
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Canvas Hall →
        </Link>
        
        <button
          onClick={publishToHall}
          className="text-sm font-medium text-gray-600 hover:text-gray-800"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}