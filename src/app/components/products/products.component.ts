import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../services/excel-import.service';
// import { Beverages } from '../../../assets/images/products/Beverages.jpg'

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: Category[] = [
    {
      id: 'beverages',
      name: 'Beverages',
      description: 'Energy drinks, coffee, and soft drinks',
      icon: 'bi bi-cup-straw',
      image: 'assets/images/products/soft-drinks.jpg' // Coca-Cola can
    },
    {
      id: 'snacks',
      name: 'Confectionery',
      description: 'Chocolates, spreads, and treats',
      icon: 'bi bi-cupcake',
      image: 'assets/images/products/snakss.webp' // Mars bar
    },
    {
      id: 'breakfast',
      name: 'Breakfast & Pantry',
      description: 'Oats, coffee mate, and more',
      icon: 'bi bi-egg-fried',
      image: 'assets/images/products/bakery.webp' // Quaker Oats
    },
    {
      id: 'pasta',
      name: 'Pasta',
      description: 'Delicious pasta and noodles',
      icon: 'bi bi-egg-fried',
      image: 'assets/images/products/pasta-main.jpg'
    },
    { 
      id: 'oliveOil',
      name: 'Olive oil',
      description: 'Olive oil',
      icon: 'bi bi-egg-fried',
      image: 'assets/images/products/olive oil.jpg'
    },
   //coffee
   {
    id: 'tea-coffee',
    name: 'Tea & Coffee',
    description: 'Tea & Coffee',
    icon: 'bi bi-egg-fried',
    image: 'assets/images/products/coffee.webp'
   }
   
  ];

  // Default products (fallback)
  defaultProducts: Product[] = [
    // Beverages
    {
      id: 1,
      name: 'Energy Drink',
      description: 'Refreshing energy drink for a quick boost.',
      image: 'assets/images/products/energyDrink.jpg',
      category: 'beverages',
      price: 2.99,
      stock: 50,
      sku: 'BEV001'
    },
    {
      id: 2,
      name: 'Redbull',
      description: 'The world-famous energy drink.',
      image: 'assets/images/products/redbull.jpg',
      category: 'beverages',
      price: 3.49,
      stock: 30,
      sku: 'BEV002'
    },
    {
      id: 3,
      name: 'Monster',
      description: 'Monster energy drink for extreme energy.',
      image: 'https://images.monsterenergy.com/media/uploads/2021/07/monster-energy-can.png',
      category: 'beverages',
      price: 2.99,
      stock: 25,
      sku: 'BEV003'
    },
    {
      id: 4,
      name: 'Coca-Cola',
      description: 'Classic Coca-Cola soft drink.',
      image: 'https://www.coca-cola.com/content/dam/journey/us/en/private/2019/07/coca-cola-original-12oz-can.png',
      category: 'beverages',
      price: 1.99,
      stock: 100,
      sku: 'BEV004'
    },
    {
      id: 5,
      name: 'Nescafé',
      description: 'Instant coffee for a quick start.',
      image: 'https://www.nescafe.com/gb/sites/default/files/2021-03/NESCAFE-Original-200g.png',
      category: 'beverages',
      price: 8.99,
      stock: 20,
      sku: 'BEV005'
    },
    {
      id: 6,
      name: 'Nescafé Gold',
      description: 'Premium instant coffee blend.',
      image: 'https://www.nescafe.com/gb/sites/default/files/2021-03/NESCAFE-Gold-200g.png',
      category: 'beverages',
      price: 12.99,
      stock: 15,
      sku: 'BEV006'
    },
    // Snacks & Sweets
    {
      id: 7,
      name: 'Mars',
      description: 'Classic Mars chocolate bar.',
      image: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SL1500_.jpg',
      category: 'snacks',
      price: 1.49,
      stock: 75,
      sku: 'SNK001'
    },
    {
      id: 8,
      name: 'Twix',
      description: 'Crunchy and caramel Twix bar.',
      image: 'https://m.media-amazon.com/images/I/81QwQwQwQwL._SL1500_.jpg',
      category: 'snacks',
      price: 1.29,
      stock: 60,
      sku: 'SNK002'
    },
    {
      id: 9,
      name: 'Bounty',
      description: 'Coconut-filled Bounty chocolate.',
      image: 'https://m.media-amazon.com/images/I/81bountybar.jpg',
      category: 'snacks',
      price: 1.39,
      stock: 45,
      sku: 'SNK003'
    },
    {
      id: 10,
      name: 'Kinder Joy',
      description: 'Delicious Kinder Joy treat.',
      image: 'https://m.media-amazon.com/images/I/61kinderjoy.jpg',
      category: 'snacks',
      price: 2.99,
      stock: 40,
      sku: 'SNK004'
    },
    {
      id: 11,
      name: 'Nutella',
      description: 'Hazelnut chocolate spread.',
      image: 'https://www.nutella.com/sites/default/files/styles/product_image/public/2021-01/Nutella-jar.png',
      category: 'snacks',
      price: 6.99,
      stock: 25,
      sku: 'SNK005'
    },
    // Breakfast & Pantry
    {
      id: 12,
      name: 'Quaker Oats',
      description: 'Healthy and nutritious oats.',
      image: 'https://www.quakeroats.com/-/media/Images/QuakerOats/Products/Product%20Images/Quaker-Old-Fashioned-Oats-18oz.png',
      category: 'breakfast',
      price: 4.99,
      stock: 30,
      sku: 'BRK001'
    },
    {
      id: 13,
      name: 'Coffee mate',
      description: 'Creamy coffee creamer.',
      image: 'https://www.coffeemate.com/sites/g/files/jgfbjl601/files/2021-01/coffee-mate-original-powder.png',
      category: 'breakfast',
      price: 3.99,
      stock: 35,
      sku: 'BRK002'
    }
  ];

  // Current products (can be imported from Excel or use defaults)
  products: Product[] = [];
  showImportSection = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Initialize with default products
    this.products = [...this.defaultProducts];
  }

  /**
   * Handle products imported from Excel
   * @param importedProducts - Products imported from Excel file
   */
  onProductsImported(importedProducts: Product[]): void {
    this.products = importedProducts;
    this.showImportSection = false;
    
    // Show success message
    console.log(`Successfully imported ${importedProducts.length} products from Excel`);
  }

  /**
   * Toggle import section visibility
   */
  toggleImportSection(): void {
    this.showImportSection = !this.showImportSection;
  }

  /**
   * Get products by category
   * @param categoryId - Category ID to filter by
   * @returns Product[] - Filtered products
   */
  getProductsByCategory(categoryId: string): Product[] {
    return this.products.filter(product => product.category === categoryId);
  }

  /**
   * Reset to default products
   */
  resetToDefaults(): void {
    this.products = [...this.defaultProducts];
    this.showImportSection = false;
  }

  /**
   * Handle image loading error
   * @param event - Error event
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/products/Beverages.jpg';
  }
}
