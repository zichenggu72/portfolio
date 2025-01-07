'use client';
import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
    latitude: 41.8781,
    longitude: -87.6298,
    images: [],
    title: 'Chicago'
  },
  {
    id: '4',
    latitude: 40.7128,
    longitude: -74.0060,
    images: [],
    title: 'New York'
  },
  {
    id: '5',
    latitude: 21.3069,
    longitude: -157.8583,
    images: [],
    title: 'Honolulu'
  },
  {
    id: '6',
    latitude: 19.7241,
    longitude: -155.0868,
    images: [],
    title: 'Big Island'
  },
  {
    id: '7',
    latitude: 20.7967,
    longitude: -156.3319,
    images: [],
    title: 'Maui'
  },
  {
    id: '8',
    latitude: 43.0731,
    longitude: -89.4012,
    images: [],
    title: 'Madison'
  },
  {
    id: '9',
    latitude: 30.3935,
    longitude: -86.4958,
    images: [],
    title: 'Destin'
  },
  {
    id: '10',
    latitude: 22.3193,
    longitude: 114.1694,
    images: [],
    title: 'Hong Kong'
  },
  {
    id: '11',
    latitude: 35.0116,
    longitude: 135.7681,
    images: [],
    title: 'Kyoto'
  },
  {
    id: '12',
    latitude: 35.6762,
    longitude: 139.6503,
    images: [],
    title: 'Tokyo'
  },
  {
    id: '13',
    latitude: 34.6937,
    longitude: 135.5023,
    images: [],
    title: 'Osaka'
  },
  {
    id: '14',
    latitude: 31.2304,
    longitude: 121.4737,
    images: [], // Add image URLs for Shanghai
    title: 'Shanghai'
  },
];

export default function CreatePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('memory');
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 45,
    zoom: 2,
    pitch: 0,
    bearing: 0
  });
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

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

  const handleCategoryClick = (category: string) => {
    if (category === 'taste') {
      router.push('/n/create/taste');
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[744px] mx-auto px-6">
        <h1 className="font-semibold mb-6">Create</h1>
        <div className="flex gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`text-sm px-3 py-1 rounded-md transition-colors ${
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
      </div>

      {/* Backdrop overlay - moved before the drawer */}
      {selectedPin && (
        <div 
          className="fixed inset-0 bg-gray-500/8 transition-all duration-300 ease-in-out z-20"
          onClick={() => setSelectedPin(null)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 w-[600px] h-screen bg-white transform transition-transform duration-300 ease-in-out z-30 flex flex-col ${
          selectedPin ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="sticky top-0 bg-white"></div>
        <div className="p-6 pt-10 ">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{selectedPin?.title}</h2>
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