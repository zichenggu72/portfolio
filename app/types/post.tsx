// types/post.ts
export interface Post {
  date: string;
  headline: string;
  previewUrl: string | null; // Using null to allow for cases where the post doesn't have a preview image
}
