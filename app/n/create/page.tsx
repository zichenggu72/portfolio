'use client';
import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';

const categories = ['memory', 'taste', 'graphic'];

export default function CreatePage() {
  const [selectedCategory, setSelectedCategory] = useState('memory');
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 45,
    zoom: 3,
    pitch: 0,
    bearing: 0
  });

  return (
    // <div className="min-h-screen bg-white">
      <div className="space-y-4">
        <h1 className="font-semibold mb-2">Create</h1>
        <div className="flex gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category 
                ? 'bg-gray-100 text-black' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      {/* </div> */}

      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100%', height: '80vh'}}
        mapStyle="mapbox://styles/zichenggu/cm5hdtsm2000f01rd96p6cggw"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        attributionControl={false}
        boxZoom={false}
        dragRotate={false}
        touchZoomRotate={false}
        pitchWithRotate={false}
      >
      </Map>
    </div>
  );
} 