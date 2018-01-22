import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'fh-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements AfterViewInit {
  rootElement;
  lastRoute: string;
  lastPosition = 0;
  constructor(public router: Router,
              private element: ElementRef) {
    this.rootElement = this.element.nativeElement;
  }

  // After view init so NativeElement is available.
  ngAfterViewInit() {
    this.router.events
      .filter(events => events instanceof NavigationStart || events instanceof NavigationEnd)
      .subscribe(events => {
        if (events instanceof NavigationStart && events.url !== this.lastRoute) {
          this.lastRoute = this.router.url;

          // // if using a div as a scroll area (note this component has to be the div, otherwise you need to
          // // select a child e.g. this.element.nativeElement.firstChild.scrollTop :
          // this.lastPosition = this.rootElement.scrollTop || 0;
          // // Scroll to top because it's a new route.
          // this.rootElement.scrollTop = 0;

          // if using window :
          this.lastPosition = window.pageYOffset;
          // Scroll to top because it's a new route.
          window.scrollTo(0, 0);
        }
        if (events instanceof NavigationEnd && events.url === this.lastRoute) {
          // this.rootElement.firstChild.scrollTop = this.lastPosition;
          const that = this;
          window.scrollTo(0,  this.lastPosition);
          // setTimeout(function () {
          //   that.element.nativeElement.scrollTop = that.lastPosition;
          //   console.log(this.element.nativeElement);
          // }, 100);
        }
      });
  }

  // onDeactivate() {
  //   document.body.scrollTop = 0;
  // }

  
}
