import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price?: number;
  stock?: number;
  sku?: string;
  imageData?: string; // Base64 encoded image data
}

@Injectable({
  providedIn: 'root'
})
export class ExcelImportService {

  constructor() { }

  /**
   * Read Excel file and convert to Product array
   * @param file - The Excel file to read
   * @returns Promise<Product[]> - Array of products from Excel
   */
  async importProductsFromExcel(file: File): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e: any) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get the first sheet
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          // Convert to Product array
          const products = await this.convertToProducts(jsonData);
          resolve(products);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Convert Excel data to Product array
   * @param data - Raw Excel data
   * @returns Product[] - Array of products
   */
  private async convertToProducts(data: any[]): Promise<Product[]> {
    if (!data || data.length < 2) {
      throw new Error('Excel file must have at least a header row and one data row');
    }

    const headers = data[0] as string[];
    const products: Product[] = [];

    // Find column indices
    const nameIndex = this.findColumnIndex(headers, ['name', 'product name', 'product', 'title']);
    const descriptionIndex = this.findColumnIndex(headers, ['description', 'desc', 'details', 'product description']);
    const categoryIndex = this.findColumnIndex(headers, ['category', 'cat', 'type', 'product category']);
    const imageIndex = this.findColumnIndex(headers, ['image', 'img', 'picture', 'photo', 'url', 'image url']);
    const priceIndex = this.findColumnIndex(headers, ['price', 'cost', 'amount']);
    const stockIndex = this.findColumnIndex(headers, ['stock', 'quantity', 'qty', 'inventory']);
    const skuIndex = this.findColumnIndex(headers, ['sku', 'product code', 'code', 'id']);

    // Process data rows
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;

      const product: Product = {
        id: i,
        name: row[nameIndex] || `Product ${i}`,
        description: row[descriptionIndex] || 'No description available',
        image: await this.processImageSource(row[imageIndex]),
        category: row[categoryIndex] || 'uncategorized'
      };

      // Add optional fields if available
      if (priceIndex !== -1 && row[priceIndex]) {
        product.price = parseFloat(row[priceIndex]) || 0;
      }
      if (stockIndex !== -1 && row[stockIndex]) {
        product.stock = parseInt(row[stockIndex]) || 0;
      }
      if (skuIndex !== -1 && row[skuIndex]) {
        product.sku = row[skuIndex].toString();
      }

      products.push(product);
    }

    return products;
  }

  /**
   * Process image source and return valid image URL or default
   * @param imageSource - Image source from Excel
   * @returns string - Processed image URL
   */
  private async processImageSource(imageSource: any): Promise<string> {
    if (!imageSource) {
      return 'assets/images/products/Beverages.jpg';
    }

    const source = imageSource.toString().trim();

    // Check if it's a valid URL
    if (this.isValidUrl(source)) {
      return source;
    }

    // Check if it's a base64 encoded image
    if (source.startsWith('data:image/')) {
      return source;
    }

    // Check if it's a local file path
    if (source.startsWith('assets/') || source.startsWith('/assets/')) {
      return source.startsWith('/') ? source : '/' + source;
    }

    // Check if it's a relative path to assets
    if (source.includes('.jpg') || source.includes('.jpeg') || source.includes('.png') || source.includes('.webp')) {
      // Try to construct a path to assets/images/products/
      if (!source.includes('/')) {
        return `assets/images/products/${source}`;
      }
      return source;
    }

    // Default fallback
    return 'assets/images/products/Beverages.jpg';
  }

  /**
   * Check if string is a valid URL
   * @param url - URL to validate
   * @returns boolean - True if valid URL
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Find column index by possible header names
   * @param headers - Array of header names
   * @param possibleNames - Array of possible column names
   * @returns number - Column index or -1 if not found
   */
  private findColumnIndex(headers: string[], possibleNames: string[]): number {
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]?.toString().toLowerCase().trim();
      if (possibleNames.some(name => header === name.toLowerCase())) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Generate Excel template for product import with better image examples
   * @returns Blob - Excel file blob
   */
  generateTemplate(): Blob {
    const template = [
      ['Name', 'Description', 'Category', 'Image URL', 'Price', 'Stock', 'SKU'],
      ['Energy Drink', 'Refreshing energy drink for a quick boost', 'beverages', 'assets/images/products/energyDrink.jpg', '2.99', '50', 'BEV001'],
      ['Redbull', 'The world-famous energy drink', 'beverages', 'assets/images/products/redbull.jpg', '3.49', '30', 'BEV002'],
      ['Mars Chocolate', 'Classic Mars chocolate bar', 'snacks', 'assets/images/products/mars.jpeg', '1.49', '75', 'SNK001'],
      ['Nescafé Gold', 'Premium instant coffee blend', 'beverages', 'assets/images/products/nescafe-gold.webp', '12.99', '15', 'BEV006'],
      ['Quaker Oats', 'Healthy and nutritious oats', 'breakfast', 'assets/images/products/ots.jpg', '4.99', '30', 'BRK001'],
      ['Coffee mate', 'Creamy coffee creamer', 'breakfast', 'assets/images/products/coffeemate.webp', '3.99', '35', 'BRK002']
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }

  /**
   * Download template file
   */
  downloadTemplate(): void {
    const blob = this.generateTemplate();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products-template.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Validate image URL and return fallback if invalid
   * @param imageUrl - Image URL to validate
   * @returns Promise<string> - Valid image URL or fallback
   */
  async validateImageUrl(imageUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(imageUrl);
      img.onerror = () => resolve('assets/images/products/Beverages.jpg');
      img.src = imageUrl;
    });
  }
} 