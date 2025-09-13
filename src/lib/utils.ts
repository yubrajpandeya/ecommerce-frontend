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

  // In production, rewrite all backend URLs to use chooseyourcart.com
  if (typeof window !== "undefined" && window.location.hostname === "chooseyourcart.com") {
    // Accept both http and https, localhost and 127.0.0.1
    url = url.replace(/https?:\/\/(localhost|127\.0\.0\.1)(:8000)?\/storage\//, "https://chooseyourcart.com/storage/");
    if (url.startsWith("https://chooseyourcart.com/storage/")) return url;
  }

  // For local dev, normalize localhost URLs to 127.0.0.1:8000
  if (url.startsWith("http://localhost:8000/storage/")) {
    return url.replace("http://localhost:8000", "https://api.chooseyourcart.com");
  }
  if (url.startsWith("http://localhost/storage/")) {
    return url.replace("http://localhost/storage/", "https://api.chooseyourcart.com/storage/");
  }
  if (url.includes("localhost/storage/")) {
    return url.replace("localhost/storage/", "127.0.0.1:8000/storage/");
  }

  // If it's already using 127.0.0.1:8000, return as is
  if (url.includes("127.0.0.1:8000")) return url;

  // If it's a remote URL but not allowed, fallback to placeholder
  if (url.startsWith("http://") || url.startsWith("https://")) {
    // Allow only dev and prod backend URLs
    if (
      url.includes("127.0.0.1:8000") ||
      url.includes("localhost:8000") ||
      url.includes("chooseyourcart.com")
    ) {
      return url;
    }
    return "/placeholder.svg";
  }

  return "/placeholder.svg";
}
