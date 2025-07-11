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
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent {}