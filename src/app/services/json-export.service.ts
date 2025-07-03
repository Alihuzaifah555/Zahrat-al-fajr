import { Injectable } from '@angular/core';
import { Product } from './excel-import.service';

export interface ExportOptions {
  includeMetadata?: boolean;
  includeCategories?: boolean;
  includeTimestamps?: boolean;
  format?: 'minified' | 'pretty';
  filename?: string;
}

export interface ExportMetadata {
  exportDate: string;
  sourceFile?: string;
  category?: string;
  categoryId?: string;
  totalProducts: number;
  importMethod: string;
  version: string;
}

@Injectable({
  providedIn: 'root'
})
export class JsonExportService {

  private readonly VERSION = '1.0.0';

  constructor() { }

  /**
   * Export products as JSON with various options
   * @param products - Products to export
   * @param options - Export options
   * @param metadata - Additional metadata
   */
  exportProducts(
    products: Product[], 
    options: ExportOptions = {}, 
    metadata?: Partial<ExportMetadata>
  ): void {
    const {
      includeMetadata = true,
      includeCategories = false,
      includeTimestamps = true,
      format = 'pretty',
      filename
    } = options;

    let exportData: any = {};

    // Add metadata if requested
    if (includeMetadata) {
      exportData.metadata = this.createMetadata(metadata);
    }

    // Add categories if requested
    if (includeCategories) {
      exportData.categories = this.getDefaultCategories();
    }

    // Add products with optional timestamps
    exportData.products = includeTimestamps 
      ? products.map(product => ({
          ...product,
          importTimestamp: new Date().toISOString(),
          exportTimestamp: new Date().toISOString()
        }))
      : products;

    // Format JSON
    const jsonString = format === 'pretty' 
      ? JSON.stringify(exportData, null, 2)
      : JSON.stringify(exportData);

    // Generate filename
    const defaultFilename = this.generateFilename(products, metadata);
    const finalFilename = filename || defaultFilename;

    // Download file
    this.downloadJson(jsonString, finalFilename);
  }

  /**
   * Export products in different formats
   * @param products - Products to export
   * @param format - Export format
   */
  exportInFormat(products: Product[], format: 'simple' | 'detailed' | 'minimal'): void {
    switch (format) {
      case 'simple':
        this.exportProducts(products, {
          includeMetadata: true,
          includeCategories: false,
          includeTimestamps: false,
          format: 'pretty'
        });
        break;
      
      case 'detailed':
        this.exportProducts(products, {
          includeMetadata: true,
          includeCategories: true,
          includeTimestamps: true,
          format: 'pretty'
        });
        break;
      
      case 'minimal':
        this.exportProducts(products, {
          includeMetadata: false,
          includeCategories: false,
          includeTimestamps: false,
          format: 'minified'
        });
        break;
    }
  }

  /**
   * Export products by category
   * @param products - Products to export
   * @param category - Category to filter by
   */
  exportByCategory(products: Product[], category: string): void {
    const filteredProducts = products.filter(product => product.category === category);
    const metadata = {
      category,
      totalProducts: filteredProducts.length,
      importMethod: 'Category Filtered Export'
    };

    this.exportProducts(filteredProducts, {
      includeMetadata: true,
      includeTimestamps: true,
      format: 'pretty'
    }, metadata);
  }

  /**
   * Export products summary
   * @param products - Products to export
   */
  exportSummary(products: Product[]): void {
    const summary = {
      metadata: this.createMetadata({
        totalProducts: products.length,
        importMethod: 'Summary Export'
      }),
      summary: {
        totalProducts: products.length,
        categories: this.getCategorySummary(products),
        priceRange: this.getPriceRange(products),
        stockSummary: this.getStockSummary(products)
      },
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        sku: product.sku
      }))
    };

    const jsonString = JSON.stringify(summary, null, 2);
    const filename = `products-summary-${new Date().toISOString().split('T')[0]}.json`;
    this.downloadJson(jsonString, filename);
  }

  /**
   * Create metadata object
   * @param customMetadata - Custom metadata to merge
   * @returns ExportMetadata - Complete metadata object
   */
  private createMetadata(customMetadata?: Partial<ExportMetadata>): ExportMetadata {
    return {
      exportDate: new Date().toISOString(),
      totalProducts: 0,
      importMethod: 'Excel Import',
      version: this.VERSION,
      ...customMetadata
    };
  }

  /**
   * Get default categories
   * @returns Category array
   */
  private getDefaultCategories(): any[] {
    return [
      {
        id: 'beverages',
        name: 'Beverages',
        description: 'Energy drinks, coffee, and soft drinks',
        icon: 'bi bi-cup-straw'
      },
      {
        id: 'snacks',
        name: 'Snacks & Sweets',
        description: 'Chocolates, spreads, and treats',
        icon: 'bi bi-cupcake'
      },
      {
        id: 'breakfast',
        name: 'Breakfast & Pantry',
        description: 'Oats, coffee mate, and more',
        icon: 'bi bi-egg-fried'
      }
    ];
  }

  /**
   * Generate filename for export
   * @param products - Products being exported
   * @param metadata - Export metadata
   * @returns string - Generated filename
   */
  private generateFilename(products: Product[], metadata?: Partial<ExportMetadata>): string {
    const date = new Date().toISOString().split('T')[0];
    const category = metadata?.category || 'all';
    const count = products.length;
    return `products-${category}-${count}-${date}.json`;
  }

  /**
   * Download JSON file
   * @param jsonString - JSON string to download
   * @param filename - Filename for download
   */
  private downloadJson(jsonString: string, filename: string): void {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Get category summary
   * @param products - Products to analyze
   * @returns Category summary object
   */
  private getCategorySummary(products: Product[]): any {
    const summary: any = {};
    products.forEach(product => {
      const category = product.category;
      if (!summary[category]) {
        summary[category] = { count: 0, totalValue: 0 };
      }
      summary[category].count++;
      summary[category].totalValue += (product.price || 0) * (product.stock || 0);
    });
    return summary;
  }

  /**
   * Get price range
   * @param products - Products to analyze
   * @returns Price range object
   */
  private getPriceRange(products: Product[]): any {
    const prices = products.map(p => p.price || 0).filter(p => p > 0);
    if (prices.length === 0) return { min: 0, max: 0, average: 0 };
    
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      average: prices.reduce((a, b) => a + b, 0) / prices.length
    };
  }

  /**
   * Get stock summary
   * @param products - Products to analyze
   * @returns Stock summary object
   */
  private getStockSummary(products: Product[]): any {
    const stocks = products.map(p => p.stock || 0);
    return {
      total: stocks.reduce((a, b) => a + b, 0),
      average: stocks.reduce((a, b) => a + b, 0) / stocks.length,
      lowStock: stocks.filter(s => s < 10).length,
      outOfStock: stocks.filter(s => s === 0).length
    };
  }
} 