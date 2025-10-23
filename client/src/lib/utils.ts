import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to get the base URL for API calls
export function getApiBaseUrl(): string {
  // In development, use relative URLs
  if (import.meta.env.DEV) {
    return '';
  }
  
  // In production, use the current domain
  return '';
}

// Utility function to make API calls
export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
}