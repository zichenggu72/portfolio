import React from "react";

interface ExperienceItem {
  header: string;
  description: string;
  previewImages: string[];
}

const WorkPreview: React.FC<ExperienceItem> = ({
  header,
  description,
  previewImages,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">{header}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex space-x-2">
        {previewImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Preview ${index + 1}`}
            className="w-[100px] h-[100px] object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default WorkPreview;
