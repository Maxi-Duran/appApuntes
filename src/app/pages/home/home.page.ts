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
        .fromTo('transform', 'translateX(0px)', 'translateX(-100px)')
        .fromTo('opacity', '1', '0.2');
    });
  }
  play() {
    this.animation.play();
  }
}
