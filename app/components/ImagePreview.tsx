import React from "react";
import Image from "next/image";

const ImagePreview = ({ src, alt, size = 40, name }) => {
  const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
  };
  const hasValidPreviewUrl = src && isValidUrl(src);
  
  if (!hasValidPreviewUrl) {
    return null;
  }

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div
      className="relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full m-2"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src} // Example "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
          alt={alt || name || "Profile picture"}
          // width={size}
          // height={size}
          className="object-cover"
          style={{ objectFit: "scale-down" }}
          fill={true}
        />
      ) : (
        <span
          className="text-gray-600 font-medium"
          style={{ fontSize: size / 2.5 }}
        >
          {initials}
        </span>
      )}
    </div>
  );
};

export default ImagePreview;
