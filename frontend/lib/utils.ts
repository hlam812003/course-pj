import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getThumbnailUrl(thumbnail: string | undefined | null): string {
  // Default thumbnail if no thumbnail is provided
  const DEFAULT_THUMBNAIL = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f";
  if (!thumbnail) return DEFAULT_THUMBNAIL;
  
  if (thumbnail.includes('youtube.com') || thumbnail.includes('youtu.be')) {
    const videoId = thumbnail.split('/').pop()?.split('?')[0];
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

  try {
    new URL(thumbnail);
    return thumbnail;
  } catch {
    return DEFAULT_THUMBNAIL;
  }
}