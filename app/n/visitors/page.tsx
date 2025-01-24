'use client';

import React, { useState, useEffect } from 'react';
import { ArrowClockwise, ArrowCounterClockwise, DownloadSimple } from '@phosphor-icons/react';

interface StrokePoint {
  row: number;
  col: number;
  oldColor: string;
  newColor: string;
}

export default function VisitorsPage() {
  const GRID_SIZE = 20;
  const COLORS = [
    '#4A1C2C', // Deep burgundy
    '#D65F5F', // Coral red
    '#E6B33C', // Golden yellow
    '#43858C', // Teal
    '#2D5A27', // Forest green
    '#8E9EA5', // Steel blue
    '#E57A44', // Burnt orange
    '#B67162', // Terra cotta
    '#9BA657'  // Olive green
  ];
  const MAX_PIXELS_PER_IP = Math.floor((GRID_SIZE * GRID_SIZE) / 4);

  const createInitialGrid = (): string[][] => 
    Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill('#FFFFFF')
    );
  
  const [grid, setGrid] = useState<string[][]>(createInitialGrid());
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[][][]>([createInitialGrid()]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStroke, setCurrentStroke] = useState<StrokePoint[]>([]);
  const [isCollaborative, setIsCollaborative] = useState(true);
  const [pixelsDrawn, setPixelsDrawn] = useState(0);

  useEffect(() => {
    setGrid(createInitialGrid());
    setHistory([createInitialGrid()]);
    setCurrentStep(0);
    setPixelsDrawn(0);
  }, [isCollaborative]);

  const colorPixel = (row: number, col: number) => {
    if (isCollaborative && pixelsDrawn >= MAX_PIXELS_PER_IP && grid[row][col] === '#FFFFFF') {
      return;
    }

    const newGrid = JSON.parse(JSON.stringify(grid));
    const oldColor = grid[row][col];
    const newColor = oldColor !== '#FFFFFF' ? '#FFFFFF' : currentColor;
    newGrid[row][col] = newColor;
    
    if (isCollaborative) {
      if (oldColor === '#FFFFFF' && newColor !== '#FFFFFF') {
        setPixelsDrawn(prev => prev + 1);
      } else if (oldColor !== '#FFFFFF' && newColor === '#FFFFFF') {
        setPixelsDrawn(prev => prev - 1);
      }
    }
    
    setGrid(newGrid);
    setCurrentStroke(prev => [...prev, { row, col, oldColor, newColor }]);
  };

  const commitStroke = () => {
    if (currentStroke.length > 0) {
      const newHistory = history.slice(0, currentStep + 1);
      setHistory([...newHistory, grid]);
      setCurrentStep(currentStep + 1);
      setCurrentStroke([]);
    }
  };

  const undo = () => {
    if (currentStep > 0) {
      const prevGrid = history[currentStep - 1];
      const currentGrid = history[currentStep];
      
      if (isCollaborative) {
        let pixelsDiff = 0;
        for (let i = 0; i < GRID_SIZE; i++) {
          for (let j = 0; j < GRID_SIZE; j++) {
            if (currentGrid[i][j] !== '#FFFFFF' && prevGrid[i][j] === '#FFFFFF') {
              pixelsDiff++;
            }
          }
        }
        setPixelsDrawn(prev => prev - pixelsDiff);
      }
      
      setCurrentStep(currentStep - 1);
      setGrid(prevGrid);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const nextGrid = history[currentStep + 1];
      const currentGrid = history[currentStep];
      
      if (isCollaborative) {
        let pixelsDiff = 0;
        for (let i = 0; i < GRID_SIZE; i++) {
          for (let j = 0; j < GRID_SIZE; j++) {
            if (nextGrid[i][j] !== '#FFFFFF' && currentGrid[i][j] === '#FFFFFF') {
              pixelsDiff++;
            }
          }
        }
        setPixelsDrawn(prev => prev + pixelsDiff);
      }
      
      setCurrentStep(currentStep + 1);
      setGrid(nextGrid);
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

  return (
    <div className="w-full max-w-[680px] mx-auto px-4">
      <h1 className="font-semibold mb-6">Visitors</h1>
      
      <div 
        className="w-full flex flex-col items-start gap-4"
        onMouseUp={() => {
          setIsDrawing(false);
          commitStroke();
        }} 
        onMouseLeave={() => {
          setIsDrawing(false);
          commitStroke();
        }}
      >
        {/* Collaborative Mode Info */}
        {isCollaborative && (
          <div className="text-gray-600">
            Hello there! You're now invited to a pattern creation party, where you will be given {MAX_PIXELS_PER_IP - pixelsDrawn}/{MAX_PIXELS_PER_IP} bricks to color. Together with 2 other visitors of this page, you will be able to create a pattern. Let your creativity flow, and have fun!
          </div>
        )}

        {/* Action Buttons - Centered above canvas */}
        <div className="flex gap-4 justify-center w-full">
          <button 
            onClick={undo}
            disabled={currentStep === 0}
            className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:hover:text-gray-600"
          >
            <ArrowCounterClockwise size={20} />
          </button>
          <button 
            onClick={redo}
            disabled={currentStep === history.length - 1}
            className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:hover:text-gray-600"
          >
            <ArrowClockwise size={20} />
          </button>
          <button 
            onClick={downloadCanvas}
            className="p-1 text-gray-600 hover:text-gray-900"
          >
            <DownloadSimple size={20} />
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
                    className="w-6 h-6 cursor-pointer border-[0.5px] border-gray-200 rounded m-[2px]"
                    style={{ backgroundColor: color }}
                    onMouseDown={() => {
                      setIsDrawing(true);
                      colorPixel(rowIndex, colIndex);
                    }}
                    onMouseEnter={() => {
                      if (isDrawing) {
                        colorPixel(rowIndex, colIndex);
                      }
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
                className={`w-8 h-8 cursor-pointer border border-gray-200 rounded ${currentColor === color ? 'ring-2 ring-blue-500' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setCurrentColor(color)}
              />
            ))}
            <input
              type="color"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              className="w-8 h-7 cursor-pointer"
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

        {/* Mode Switch Button */}
        <button
          onClick={() => setIsCollaborative(!isCollaborative)}
          className="mt-2 text-gray-400 hover:text-gray-600 self-center"
        >
          {isCollaborative 
            ? "I'd rather have my own canvas" 
            : "Back to joint canvas"}
        </button>
      </div>
    </div>
  );
}