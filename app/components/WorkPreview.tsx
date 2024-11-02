import React from "react";
import { MdxImage } from "./MdxImage";
import circle from "app/public/circle.png";

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
        {previewImages.map((img, index) => {
          return (
            <MdxImage
              src={img}
              alt="Picture of the author"
              width={100}
              height={100}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkPreview;
