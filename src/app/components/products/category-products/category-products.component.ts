import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'category-products.component.html',
  styleUrls: ['category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  category: Category | undefined;
  products: Product[] = [];

  private allCategories: Category[] = [
    {
      id: 'beverages',
      name: 'Beverages',
      description: 'Energy drinks, coffee, and soft drinks',
      icon: 'bi bi-cup-straw',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'snacks',
      name: 'Snacks & Sweets',
      description: 'Chocolates, spreads, and treats',
      icon: 'bi bi-cupcake',
      image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'breakfast',
      name: 'Breakfast & Pantry',
      description: 'Oats, coffee mate, and more',
      icon: 'bi bi-egg-fried',
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  private allProducts: Product[] = [
    // Beverages
    {
      id: 1,
      name: 'Energy Drink',
      description: 'Refreshing energy drink for a quick boost.',
      image: 'assets/images/products/energyDrink.jpg',
      category: 'beverages'
    },
    {
      id: 2,
      name: 'Redbull',
      description: 'The world-famous energy drink.',
      image: 'assets/images/products/redbull.jpg',
      category: 'beverages'
    },
    {
      id: 3,
      name: 'Monster',
      description: 'Monster energy drink for extreme energy.',
      image: 'assets/images/products/monster.jpg',
      category: 'beverages'
    },
    {
      id: 4,
      name: 'Coca-Cola',
      description: 'Classic Coca-Cola soft drink.',
      image: 'assets/images/products/cococola.webp',
      category: 'beverages'
    },
    {
      id: 5,
      name: 'Nescafé',
      description: 'Instant coffee for a quick start.',
      image: 'assets/images/products/nescafe.webp',
      category: 'beverages'
    },
    {
      id: 6,
      name: 'Nescafé Gold',
      description: 'Premium instant coffee blend.',
      image: 'assets/images/products/nescafe-gold.webp',
      category: 'beverages'
    },
    // Snacks & Sweets
    {
      id: 7,
      name: 'Mars',
      description: 'Classic Mars chocolate bar.',
      image: 'assets/images/products/mars.jpeg',
      category: 'snacks'
    },
    {
      id: 8,
      name: 'Twix',
      description: 'Crunchy and caramel Twix bar.',
      image: 'assets/images/products/twix.webp',
      category: 'snacks'
    },
    {
      id: 9,
      name: 'Bounty',
      description: 'Coconut-filled Bounty chocolate.',
      image: 'assets/images/products/bounty.webp',
      category: 'snacks'
    },
    {
      id: 10,
      name: 'Kinder Joy',
      description: 'Delicious Kinder Joy treat.',
      image: 'assets/images/products/kinder-joy.jpg',
      category: 'snacks'
    },
    {
      id: 11,
      name: 'Nutella',
      description: 'Hazelnut chocolate spread.',
      image: 'assets/images/products/neutella.webp',
      category: 'snacks'
    },
    // Breakfast & Pantry
    {
      id: 12,
      name: 'Quaker Oats',
      description: 'Healthy and nutritious oats.',
      image: 'assets/images/products/ots.jpg',
      category: 'breakfast'
    },
    {
      id: 13,
      name: 'Coffee mate',
      description: 'Creamy coffee creamer.',
      image: 'assets/images/products/coffeemate.webp',
      category: 'breakfast'
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.category = this.allCategories.find(c => c.id === id!);
      this.products = this.allProducts.filter(p => p.category === id);
    });
  }
}
