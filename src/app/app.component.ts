import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SliderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isScrolled = false;
  showScrollTop = false;
  isLoading = false;
  currentYear = new Date().getFullYear();
  showSlider = false;
  showSearch = false;
  selectedLang = 'EN';
  menuOpen = false;
  
  navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' }
  ];

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.showScrollTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  setLang(lang: string) {
    this.selectedLang = lang;
    // Optionally, add logic to change the app language here
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit() {
    // Simulate loading state
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

    // Handle router events to show/hide slider
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showSlider = event.url === '/' || event.url === '/about';
    });

    // Initial check for current route
    this.showSlider = this.router.url === '/' || this.router.url === '/about';
  }
}
