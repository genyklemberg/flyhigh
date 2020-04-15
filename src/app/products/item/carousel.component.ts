import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {CarouselItemDirective} from './carousel-item.directive';
import {animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style} from '@angular/animations';
import {MatDialog} from '@angular/material';

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElement {
}

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  template: `
    <section class="carousel-wrapper" [ngStyle]="carouselWrapperStyle">
      <ul class="carousel-inner" #carousel>
        <li *ngFor="let item of items;" class="carousel-item">
          <ng-container [ngTemplateOutlet]="item.tpl"></ng-container>
        </li>
      </ul>
    </section>
    <div *ngIf="showControls" style="margin-top: 1em;" class="slider-btn">
      <div>
        <button 
          *ngIf="currentSlide !== 0"
          (click)="prev()" class="btn btn-default btn-prev"><span class="pe-7s-angle-left"></span>Prev</button>
      </div>
      <a (click)='closeDialog()'><i class="fa fa-times-circle-o" aria-hidden="true"></i></a>
      <div>
        <button
          *ngIf="items.length > 1 && currentSlide !== items.length - 1"
          (click)="next()" class="btn btn-default btn-next">Next<span class="pe-7s-angle-right"></span></button>
      </div>
    </div>
  `,
  styles: ['../style.scss'],

})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective>;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  carouselWrapperStyle = {};
  @ViewChildren(
    CarouselItemElement, {read: ElementRef}) private itemsElements: QueryList<ElementRef>;
  @ViewChild('carousel') private carousel: ElementRef;
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;

  constructor(private builder: AnimationBuilder, public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    // For some reason only here I need to add setTimeout,
    // in my local env it's working without this.
    setTimeout(() => {
      this.itemWidth = this.itemsElements.first.nativeElement.offsetWidth;
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`
      };
    });
  }

  next() {
    if (this.currentSlide + 1 === this.items.length) return;
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  prev() {
    if (this.currentSlide === 0) return;

    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  private buildAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({transform: `translateX(-${offset}px)`}))
    ]);
  }


}
