import React from 'react';
import { Post } from "app/types/post";
import ImagePreview from './ImagePreview';

const PostPreview = (post: Post) => {
  const url = post.previewUrl;
  const imagePreview = (
    <ImagePreview
      src={url}
      alt={`${post.headline}`}
      size={60}
      name={post.headline}
    />
  );

  return (
    <div className="flex flex-row items-center w-full mt-10">
      <div className="bg-gray-100 p-4 rounded-lg my-4 flex flex-start grow items-center ">
        <div className="flex-grow max-w-[420px]">
          <p className="text-sm text-gray-600">{post.date}</p>
          <p className="text-base font-medium mt-1">{post.headline}</p>
        </div>
      </div>
              {imagePreview && (
          <>
            <div className="w-[100px]" />
            <div className="rounded-full overflow-hidden flex-shrink-0">
              {imagePreview}
            </div>
          </>
        )}
    </div>
  );
};

export default PostPreview;