import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SliderService } from './slider.service';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  button: { text: string; link: string } | null;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  slides: Slide[] = [];
  currentSlideIndex = 0;
  private intervalId: any;
  private triggerNextSub: any;

  constructor(private router: Router, private sliderService: SliderService) {
    const aboutSlides: Slide[] = [
      {
        image: 'assets/images/products/b1.jpeg',
        title: 'Breakfast & Pantry',
        subtitle: 'Quaker Oats, Coffee mate and more',
        button: { text: 'Explore Breakfast', link: '/products/category/breakfast' }
      },
      {
        image: 'assets/images/products/b3.jpeg',
        title: 'Beverages',
        subtitle: 'Redbull, Monster, Coca-Cola, Nescafé and more',
        button: { text: 'Explore Beverages', link: '/products/category/beverages' }
      },
      {
        image: 'assets/images/products/b7.jpeg',
        title: 'Beverages',
        subtitle: 'Redbull, Monster, Coca-Cola, Nescafé and more',
        button: { text: 'Explore Beverages', link: '/products/category/beverages' }
      },
      {
        image: 'assets/images/products/b5.jpeg',
        title: 'Snacks & Sweets',
        subtitle: 'Mars, Twix, Bounty, Kinder Joy, Nutella and more',
        button: { text: 'Explore Snacks', link: '/products/category/snacks' }
      }
    ];
    const defaultSlides: Slide[] = [
      {
        image: 'assets/images/products/b1.jpeg',
        title: 'Breakfast & Pantry',
        subtitle: 'Quaker Oats, Coffee mate and more',
        button: { text: 'Explore Breakfast', link: '/products/category/breakfast' }
      },
      {
        image: 'assets/images/products/b7.jpeg',
        title: 'Beverages',
        subtitle: 'Redbull, Monster, Coca-Cola, Nescafé and more',
        button: { text: 'Explore Beverages', link: '/products/category/beverages' }
      },
      {
        image: 'assets/images/products/b3.jpeg',
        title: 'Snacks & Sweets',
        subtitle: 'Mars, Twix, Bounty, Kinder Joy, Nutella and more',
        button: { text: 'Explore Snacks', link: '/products/category/snacks' }
      },
      {
        image: 'assets/images/products/b5.jpeg',
        title: 'Snacks & Sweets',
        subtitle: 'Mars, Twix, Bounty, Kinder Joy, Nutella and more',
        button: { text: 'Explore Snacks', link: '/products/category/snacks' }
      },
    ];
    this.slides = this.router.url === '/about' ? aboutSlides : defaultSlides;
    this.router.events.subscribe(() => {
      this.slides = this.router.url === '/about' ? aboutSlides : defaultSlides;
      this.currentSlideIndex = 0;
      this.updateCurrentImage();
    });
  }

  ngOnInit() {
    this.startAutoSlide();
    this.updateCurrentImage();
    this.triggerNextSub = this.sliderService.triggerNext$.subscribe(() => {
      this.nextSlide();
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.triggerNextSub) {
      this.triggerNextSub.unsubscribe();
    }
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.updateCurrentImage();
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
    this.updateCurrentImage();
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
    this.updateCurrentImage();
  }

  updateCurrentImage() {
    const img = this.slides[this.currentSlideIndex]?.image;
    if (img) {
      this.sliderService.setCurrentImage(img);
    }
  }
} 