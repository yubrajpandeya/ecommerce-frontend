import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fix image URLs from backend to use correct host
 */
export function fixImageUrl(url: string | null): string {
  if (!url) return "/placeholder.svg";
  
  // If it's already a relative path, return as is
  if (url.startsWith("/")) return url;
  
  // Fix localhost URLs to use 127.0.0.1:8000
  if (url.includes("localhost/storage/")) {
    return url.replace("localhost/storage/", "127.0.0.1:8000/storage/");
  }
  
  // If it's already using 127.0.0.1:8000, return as is
  if (url.includes("127.0.0.1:8000")) return url;
  
  return url;
}
