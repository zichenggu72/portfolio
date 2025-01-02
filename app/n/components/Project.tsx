import React from 'react';
import Image from 'next/image';

interface ProjectProps {
  project: {
    year: string;
    title: string;
    description: string;
    institution?: string;
    image?: string;
  }
}

export function Project({ project }: ProjectProps) {
  const [imageError, setImageError] = React.useState(false);
  
  const imagePath = project.image ? `/pic/${project.image}` : '';
  console.log('Project image path:', imagePath);
  
  return (
    <div className="space-y-4 border border-gray-200 p-4 rounded-lg">
      {project.image && !imageError && (
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={imagePath}
            alt={project.title}
            width={800}
            height={600}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            className="rounded-lg"
            onError={(e) => {
              console.error(`Failed to load image: ${imagePath}`);
              setImageError(true);
            }}
          />
        </div>
      )}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div>
            {project.institution && (
              <div className="text-sm text-gray-600">{project.institution}</div>
            )}
            <h2 className="text-xl font-semibold">{project.title}</h2>
          </div>
          <div className="text-gray-600">{project.year}</div>
        </div>
        <p className="text-gray-700">{project.description}</p>
      </div>
    </div>
  );
} 