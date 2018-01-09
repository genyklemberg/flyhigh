import { AfterViewInit,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    Input,
    QueryList,
    ViewChild,
    ViewChildren } from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
import { animate,
    AnimationBuilder,
    AnimationFactory,
    AnimationPlayer,
    style } from '@angular/animations';

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
    <div *ngIf="showControls" style="margin-top: 1em" class="slider-btn">
      <button (click)="prev()" class="btn btn-default btn-prev"><span class="pe-7s-angle-left"></span>Prev</button>
      <i class="fa fa-times-circle-o" aria-hidden="true"></i>
      <button (click)="next()" class="btn btn-default btn-next">Next<span class="pe-7s-angle-right"></span></button>
    </div>
  `,
    styles: ['../style.scss'],
    
})
export class CarouselComponent implements AfterViewInit {
    @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;
    @ViewChildren(
        CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
    @ViewChild('carousel') private carousel : ElementRef;
    @Input() timing = '250ms ease-in';
    @Input() showControls = true;
    private player : AnimationPlayer;
    private itemWidth : number;
    private currentSlide = 0;
    carouselWrapperStyle = {};

    next() {
        if( this.currentSlide + 1 === this.items.length ) return;
        this.currentSlide = (this.currentSlide + 1) % this.items.length;
        console.log(this.itemWidth);
        const offset = this.currentSlide * this.itemWidth;
        console.log(offset);
        const myAnimation : AnimationFactory = this.buildAnimation(offset);
        this.player = myAnimation.create(this.carousel.nativeElement);
        this.player.play();
    }

    private buildAnimation( offset ) {
        return this.builder.build([
            animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
        ]);
    }

    prev() {
        if( this.currentSlide === 0 ) return;

        this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
        const offset = this.currentSlide * this.itemWidth;

        const myAnimation : AnimationFactory = this.buildAnimation(offset);
        this.player = myAnimation.create(this.carousel.nativeElement);
        this.player.play();
    }

    constructor( private builder : AnimationBuilder ) {
    }

    ngAfterViewInit() {
        // For some reason only here I need to add setTimeout,
        // in my local env it's working without this.
        setTimeout(() => {
            this.itemWidth = this.itemsElements.first.nativeElement.offsetWidth;
          console.log(this.itemsElements);
            console.log(this.itemWidth);
            this.carouselWrapperStyle = {
                width: `${this.itemWidth}px`
            }
        });

    }
}
