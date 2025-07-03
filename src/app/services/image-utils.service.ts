import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUtilsService {

  constructor() { }

  /**
   * Convert file to base64 string
   * @param file - File to convert
   * @returns Promise<string> - Base64 encoded string
   */
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Validate if a string is a valid image URL
   * @param url - URL to validate
   * @returns boolean - True if valid image URL
   */
  isValidImageUrl(url: string): boolean {
    if (!url) return false;
    
    // Check for data URLs
    if (url.startsWith('data:image/')) {
      return true;
    }
    
    // Check for valid HTTP/HTTPS URLs
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      // Check for local asset paths
      return url.startsWith('assets/') || url.startsWith('/assets/');
    }
  }

  /**
   * Get image dimensions from URL
   * @param url - Image URL
   * @returns Promise<{width: number, height: number}> - Image dimensions
   */
  async getImageDimensions(url: string): Promise<{width: number, height: number}> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Resize image to specified dimensions
   * @param file - Image file
   * @param maxWidth - Maximum width
   * @param maxHeight - Maximum height
   * @returns Promise<Blob> - Resized image blob
   */
  async resizeImage(file: File, maxWidth: number = 800, maxHeight: number = 600): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw resized image
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to resize image'));
          }
        }, 'image/jpeg', 0.8);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Convert image to different format
   * @param file - Image file
   * @param format - Target format ('jpeg', 'png', 'webp')
   * @param quality - Image quality (0-1)
   * @returns Promise<Blob> - Converted image blob
   */
  async convertImageFormat(file: File, format: 'jpeg' | 'png' | 'webp' = 'jpeg', quality: number = 0.8): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error(`Failed to convert image to ${format}`));
          }
        }, `image/${format}`, quality);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Generate thumbnail from image
   * @param file - Image file
   * @param size - Thumbnail size (width and height)
   * @returns Promise<Blob> - Thumbnail blob
   */
  async generateThumbnail(file: File, size: number = 150): Promise<Blob> {
    return this.resizeImage(file, size, size);
  }

  /**
   * Check if file is an image
   * @param file - File to check
   * @returns boolean - True if file is an image
   */
  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * Get file extension from filename
   * @param filename - Filename
   * @returns string - File extension
   */
  getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  /**
   * Validate image file size
   * @param file - Image file
   * @param maxSizeMB - Maximum size in MB
   * @returns boolean - True if file size is valid
   */
  isValidFileSize(file: File, maxSizeMB: number = 5): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  }
} 