import {AfterViewInit, Component, ElementRef, HostListener} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'fh-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements AfterViewInit {
  rootElement;
  lastRoute: string;
  lastPosition = 0;
  previousUrl: string;
  backFromItems: boolean;

  constructor(
    public router: Router,
    private _scrollToService: ScrollToService,
    private element: ElementRef) {
    this.rootElement = this.element.nativeElement;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if (this.backFromItems) {
      this.backFromItems = false;
      this._scrollToService.scrollTo({
        target: 'projects'
      });
    }
  }

  // After view init so NativeElement is available.
  ngAfterViewInit() {
    this.router.events
      .filter(events => events instanceof NavigationStart || events instanceof NavigationEnd)
      .subscribe(events => {
        if (events instanceof NavigationStart && events.url !== this.lastRoute) {
          this.lastRoute = this.router.url;
          this.previousUrl = events.url;
          // // if using a div as a scroll area (note this component has to be the div, otherwise you need to
          // // select a child e.g. this.element.nativeElement.firstChild.scrollTop :
          // this.lastPosition = this.rootElement.scrollTop || 0;
          // // Scroll to top because it's a new route.
          // this.rootElement.scrollTop = 0;

          // if using window :
          // this.lastPosition = window.pageYOffset;
          // Scroll to top because it's a new route.
          window.scrollTo(0, 0);
        }
        if (events instanceof NavigationEnd && events.url === this.lastRoute) {
          // this.rootElement.firstChild.scrollTop = this.lastPosition;
          if (this.previousUrl.indexOf('products') !== -1) {
            this._scrollToService.scrollTo({
              target: 'projects'
            });
          } else if (this.previousUrl.indexOf('service') !== -1) {
            this._scrollToService.scrollTo({
              target: 'about'
            });
          }
          if (this.previousUrl.indexOf('item') !== -1 && 
          this.lastRoute.indexOf('products') !== -1) {
            this.backFromItems = true;
          }
          
          // window.scrollTo(0, this.lastPosition);
        }
      });
  }

  // onDeactivate() {
  //   document.body.scrollTop = 0;
  // }


}
