'use client';
import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import Image from 'next/image';

type Pin = {
  id: string;
  latitude: number;
  longitude: number;
  images: {
    url: string;
    alt?: string;
    orientation: 'horizontal' | 'vertical';
  }[];
  title: string;
}

const categories = ['memory', 'taste', 'graphic'];

const initialPins: Pin[] = [
  {
    id: '1',
    latitude: 47.6062,
    longitude: -122.3321,
    images: [], // Add image URLs for Seattle
    title: 'Seattle'
  },
  {
    id: '2',
    latitude: 51.5074,
    longitude: -0.1278,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736034358/DSC00587_y04x96.jpg',
        alt: 'London scene 1',
        orientation: 'horizontal'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736034415/DSC00427-2_rvbix4.jpg',
        alt: 'London scene 2',
        orientation: 'horizontal'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736034383/DSC00472_bmbbd2.jpg',
        alt: 'London scene 3',
        orientation: 'vertical'
      }
    ],
    title: 'London'
  },
  {
    id: '3',
    latitude: 31.2304,
    longitude: 121.4737,
    images: [], // Add image URLs for Shanghai
    title: 'Shanghai'
  }
];

export default function CreatePage() {
  const [selectedCategory, setSelectedCategory] = useState('memory');
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 45,
    zoom: 2,
    pitch: 0,
    bearing: 0
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[744px] mx-auto px-6">
        <h1 className="font-semibold mb-6">Create</h1>
        <div className="flex gap-4 mb-8">
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

        <div className="w-full">
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
            maxPitch={0}
            minPitch={0}
          >
            {initialPins.map(pin => (
              <Marker
                key={pin.id}
                latitude={pin.latitude}
                longitude={pin.longitude}
                onClick={() => setSelectedPin(pin)}
              >
                <div className="w-3 h-3 bg-black rounded-full cursor-pointer" />
              </Marker>
            ))}
          </Map>
        </div>
      </div>

      {/* Backdrop overlay - moved before the drawer */}
      {selectedPin && (
        <div 
          className="fixed inset-0 bg-gray-500/8 transition-all duration-300 ease-in-out z-20"
          onClick={() => setSelectedPin(null)}
        />
      )}

      {/* Drawer - ensure it's above the overlay */}
      <div 
        className={`fixed top-0 right-0 w-[600px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${
          selectedPin ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold mb-6">{selectedPin?.title}</h2>
            <button 
              onClick={() => setSelectedPin(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              {/* <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg> */}
            </button>
          </div>
          
          {selectedPin?.images.length ? (
            <div className="image-container">
              {selectedPin.images.map((image, index) => (
                <Image 
                  key={index}
                  src={image.url}
                  alt={image.alt || ''}
                  width={1500}
                  height={1000}
                  className="w-full h-auto"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No images yet</p>
          )}
        </div>
      </div>
    </div>
  );
} 