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
    },
    {
      id: 'pasta',
      name: 'Pasta',
      description: 'Delicious pasta and noodles',
      icon: 'bi bi-egg-fried',
      image: 'assets/images/products/b-cover.jpg'
    },
    {
      id: 'tea-coffee',
      name: 'Tea & Coffee',
      description: 'All kinds of tea and coffee products',
      icon: 'bi bi-cup-hot',
      image: 'assets/images/products/nescafe-gold.webp'
    },
    { 
      id: 'oliveOil',
      name: 'Olive oil',
      description: 'Olive oil',
      icon: 'bi bi-egg-fried',
      image: 'assets/images/products/olive oil.jpg'
    },
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
      id: 5,
      name: 'Nescafé',
      description: 'Instant coffee for a quick start.',
      image: 'assets/images/products/nescafe.webp',
      category: 'tea-coffee'
    },
    {
      id: 6,
      name: 'Nescafé Gold',
      description: 'Premium instant coffee blend.',
      image: 'assets/images/products/nescafe-gold.webp',
      category: 'tea-coffee'
    },
    {
      id: 21,
      name: 'Nescafé Gold 190G',
      description: 'Premium Nescafé Gold instant coffee, 190g jar.',
      image: 'assets/images/products/Nescafe Gold 190G.jpg',
      category: 'tea-coffee'
    },
    {
      id: 22,
      name: 'Nescafé Gold 47.5G',
      description: 'Premium Nescafé Gold instant coffee, 47.5g jar.',
      image: 'assets/images/products/Nescafe Gold 47.5G.jpg',
      category: 'tea-coffee'
    },
    {
      id: 23,
      name: 'Nescafé Gold 95G',
      description: 'Premium Nescafé Gold instant coffee, 95g jar.',
      image: 'assets/images/products/Nescafe Gold 95G.jpg',
      category: 'tea-coffee'
    },
    {
      id: 24,
      name: 'Nescafé Gold',
      description: 'Premium Nescafé Gold instant coffee.',
      image: 'assets/images/products/nescafe-gold.webp',
      category: 'tea-coffee'
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
      category: 'tea-coffee'
    },
    {
      id: 14,
      name: 'Nesquik Refill Bag',
      description: 'Delicious Nesquik chocolate refill bag.',
      image: 'assets/images/products/Nesquik Refill Bag.jpeg',
      category: 'breakfast'
    },
    {
      id: 15,
      name: 'Quality Street',
      description: 'Assorted Quality Street chocolates.',
      image: 'assets/images/products/Quality Street.jpg',
      category: 'snacks'
    },
    {
      id: 16,
      name: 'Schweppes Indian Tonic',
      description: 'Schweppes Indian Tonic sleek can 330ml.',
      image: 'assets/images/products/Schweppes Indian Tonic sleek can 330ml.jpg',
      category: 'beverages'
    },
    {
      id: 17,
      name: 'Schweppes Bitter Lemon',
      description: 'Schweppes Bitter Lemon sleek can 330ml.',
      image: 'assets/images/products/Schweppes Bitter Lemon sleek can 330ml.jpg',
      category: 'beverages'
    },
    {
      id: 18,
      name: 'CocaCola Zero',
      description: 'CocaCola Zero 330ml can.',
      image: 'assets/images/products/Cocacola Zero 330ml.webp',
      category: 'beverages'
    },
    {
      id: 19,
      name: 'CocaCola',
      description: 'CocaCola 330ml can.',
      image: 'assets/images/products/Cocacola 330ml.webp',
      category: 'beverages'
    },
    {
      id: 20,
      name: 'Caprisun Fairy Drink',
      description: 'Caprisun Fairy Drink juice.',
      image: 'assets/images/products/Caprisun Fairy Drink.jpg',
      category: 'beverages'
    },
    {
      id: 25,
      name: 'Caprisun Fun Alarm',
      description: 'Caprisun Fun Alarm juice.',
      image: 'assets/images/products/Caprisun Fun Alarm.jpg',
      category: 'beverages'
    },
    {
      id: 26,
      name: 'Carpsun Multivitamin',
      description: 'Carpsun Multivitamin juice.',
      image: 'assets/images/products/Carpsun Multivitamin.jpg',
      category: 'beverages'
    },
    {
      id: 100,
      name: 'Granoro Pennoni',
      description: 'Classic Italian spaghetti pasta.',
      image: 'assets/images/products/pasta.jpeg',
      category: 'pasta'
    },
    {
      id: 101,
      name: 'Granoro Ditaloni',
      description: 'Delicious fusilli pasta, perfect for salads and sauces.',
      image: 'assets/images/products/pasta-2.jpeg',
      category: 'pasta'
    },
    {
      id: 102,
      name: 'Olive Oil',
      description: 'Olive Oil ',
      image: 'assets/images/products/olive oil.jpg',
      category: 'oliveOil'
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
