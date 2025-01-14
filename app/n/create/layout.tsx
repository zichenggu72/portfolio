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
    caption?: string;
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
        orientation: 'vertical',
        caption: 'Determined turkish man'
       
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736034415/DSC00427-2_rvbix4.jpg',
        alt: 'London scene 2',
        orientation: 'horizontal',
        caption: 'Determined turkish man'
     
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736034383/DSC00472_bmbbd2.jpg',
        alt: 'London scene 3',
        orientation: 'horizontal',
        caption: 'Determined turkish man'
       
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736448815/DSC09217_cl0udi.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'Determined turkish man'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736448701/DSC09216_qidn0m.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'Determined turkish man'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736448917/DSC08934-2_joik0b.jpg',
        alt: 'London scene 3',
        orientation: 'horizontal',
        caption: 'Determined turkish man'
      },      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736448829/DSC09176_tdohyw.jpg',
        alt: 'London scene 3',
        orientation: 'horizontal',
        caption: 'Determined turkish man'
      },      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736449025/DSC08064_dtyiyv.jpg',
        alt: 'London scene 3',
        orientation: 'horizontal',
        caption: 'Determined turkish man'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736870497/DSC08926-2_c33gze.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'Determined turkish man'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736870498/DSC08916-2_uihvcd.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'Determined turkish man'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736872999/DSC08900-2_rbfgao.jpg',
        alt: 'London scene 1',
        orientation: 'vertical',
        caption: 'Determined turkish man'
      },

    ],
    title: 'London'
  },
  {
    id: '3',
    latitude: 41.0082,
    longitude: 28.9784,
    images: [
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736448601/DSC00196-2_fngkqr.jpg',
        alt: 'Turkey scene 1',
        orientation: 'vertical'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736453522/DSC00199-2_zrmdit.jpg',
        alt: 'Turkey scene 2',
        orientation: 'vertical'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1736448471/DSC09659-2_jxnkhg.jpg',
        alt: 'Turkey scene 2',
        orientation: 'horizontal'
        
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1735939400/DSC09764-2_nnm85n.jpg',
        alt: 'Turkey scene 3',
        orientation: 'horizontal',
        caption: 'Determined turkish man'
      },
      {
        url: 'https://res.cloudinary.com/dsu2yornu/image/upload/v1735939400/DSC09764-2_nnm85n.jpg',
        alt: 'Turkey scene 4',
        orientation: 'horizontal',
        caption: 'Determined turkish man'
      }
    ],
    title: 'Turkey'
  },
  
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
        className={`fixed top-0 right-0 w-1/2 h-screen bg-white transform 
          transition-transform duration-300 ease-in-out z-30 flex flex-col
          ${selectedPin ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="sticky top-0 bg-white"></div>
        <div className="p-8 pt-10">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{selectedPin?.title}</h2>
            {/* <button 
              onClick={() => setSelectedPin(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button> */}
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto p-8 pt-0">
          {selectedPin?.images.length ? (
            <div className="grid grid-cols-2 auto-rows-[250px] gap-8">
              {selectedPin.images
                .sort((a, b) => {
                  if (a.orientation === 'vertical' && b.orientation === 'horizontal') return -1;
                  if (a.orientation === 'horizontal' && b.orientation === 'vertical') return 1;
                  return 0;
                })
                .map((image, index) => (
                  <div 
                    key={index} 
                    className={`relative flex flex-col
                      ${image.orientation === 'vertical' ? 'col-span-1 row-span-2' : 'col-span-2 row-span-2'}`}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <Image 
                        src={image.url}
                        alt={image.alt || ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {image.caption && (
                      <p className="mt-2 text-gray-600">{image.caption}</p>
                    )}
                  </div>
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