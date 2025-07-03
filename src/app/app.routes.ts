import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactComponent } from './components/contact/contact.component';
import { CategoryProductsComponent } from './components/products/category-products/category-products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/category/:id', component: CategoryProductsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
