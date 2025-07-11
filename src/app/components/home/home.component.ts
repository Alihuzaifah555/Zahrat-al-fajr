import { Component, OnInit, OnDestroy, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SliderService } from '../slider/slider.service';

interface Product {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [
    {
      title: 'Olive Oil',
      description: 'Olive Oil ',
      image: 'assets/images/products/olive oil.jpg',
    },
    {
      title: 'Granoro Pennoni',
      description: 'Classic Italian spaghetti pasta.',
      image: 'assets/images/products/pasta.jpeg',
    },
    {
      title: 'Quaker Oats',
      description: 'Healthy and nutritious oats.',
      image: 'assets/images/products/ots.jpg',
    },
  ];

  rollingImageUrl: string | null = null;
  rollingIn = false;
  rollingImageStyle: any = {};
  private sliderImageSub: any;
  private lastScrollPast = false;

  constructor(private sliderService: SliderService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.sliderImageSub = this.sliderService.currentImage$.subscribe(url => {
      if (url) this.rollingImageUrl = url;
    });
  }

  ngOnDestroy(): void {
    if (this.sliderImageSub) this.sliderImageSub.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const slider = document.getElementById('mainCarousel');
    const welcome = document.querySelector('.hero-section');
    if (!slider || !welcome) return;
    const rect = slider.getBoundingClientRect();
    const welcomeRect = welcome.getBoundingClientRect();
    const scrolledPast = rect.bottom < 80; // 80px from top
    if (scrolledPast && !this.lastScrollPast) {
      // Calculate start position (from slider)
      const startY = rect.bottom - welcomeRect.top - 110; // 110px offset for centering
      this.rollingImageStyle = {
        '--roll-start-y': `${startY}px`
      };
      this.rollingIn = true;
      this.sliderService.triggerNext();
    } else if (!scrolledPast && this.lastScrollPast) {
      this.rollingIn = false;
    }
    this.lastScrollPast = scrolledPast;
  }
}
