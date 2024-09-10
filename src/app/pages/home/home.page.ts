import {
  Component,
  ElementRef,
  ViewChildren,
  AfterViewInit,
  QueryList,
} from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChildren('swiperSlide', { read: ElementRef }) slides!: QueryList<
    ElementRef<HTMLDivElement>
  >;

  private animation!: Animation;

  constructor(private animationCtrl: AnimationController) {}

  ngAfterViewInit() {
    this.slides.forEach((slide) => {
      this.animation = this.animationCtrl
        .create()
        .addElement(slide.nativeElement)
        .duration(1500)
        .iterations(Infinity)
        .fromTo('transform', 'translateX(0px)', 'translateX(-100px)')
        .fromTo('opacity', '1', '0.2')
        .keyframes([
          { offset: 0, transform: 'rotate(0deg)' },
          { offset: 0.25, transform: 'rotate(-5deg)' },
          { offset: 0.5, transform: 'rotate(5deg)' },
          { offset: 0.75, transform: 'rotate(-5deg)' },
          { offset: 1, transform: 'rotate(0deg)' },
        ]);
      this.animation.play();
    });
  }
}
