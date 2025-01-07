'use client';
import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
  // ... rest of your pins
];

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const pathname = usePathname();
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 45,
    zoom: 2,
    pitch: 0,
    bearing: 0
  });

  useEffect(() => {
    if (selectedPin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPin]);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-20">
        {children}
      </div>

      <div className={`absolute top-[140px] left-0 right-0 mx-auto max-w-[680px] px-8 
        ${pathname !== '/n/create' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
              <div 
                className="relative"
                onMouseEnter={() => setHoveredPin(pin.id)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <div className="w-3 h-3 bg-black rounded-full cursor-pointer" />
                
                {/* Tooltip */}
                {hoveredPin === pin.id && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded-md">
                    {pin.title} 
                  </div>
                )}
              </div>
            </Marker>
          ))}
        </Map>
      </div>

      {/* Backdrop overlay */}
      {selectedPin && (
        <div 
          className="fixed inset-0 bg-gray-500/8 transition-all duration-300 ease-in-out z-20"
          onClick={() => setSelectedPin(null)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 w-[600px] h-screen bg-white transform 
          transition-transform duration-300 ease-in-out z-30 flex flex-col
          ${selectedPin ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="sticky top-0 bg-white"></div>
        <div className="p-6 pt-10">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{selectedPin?.title}</h2>
            <button 
              onClick={() => setSelectedPin(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
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