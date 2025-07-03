import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SliderService {
  currentImage$ = new BehaviorSubject<string | null>(null);
  triggerNext$ = new Subject<void>();

  setCurrentImage(url: string) {
    this.currentImage$.next(url);
  }

  triggerNext() {
    this.triggerNext$.next();
  }
} 