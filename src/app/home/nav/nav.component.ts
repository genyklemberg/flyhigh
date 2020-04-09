import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScrollService} from '../../scroll.service';

@Component({
  selector: 'fh-nav',
  templateUrl: './nav.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit{

  constructor(public router: Router,
              public route: ActivatedRoute,
              private scrollService: ScrollService) {
  }

  ngOnInit() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
      const scrollPos = window.scrollY;

      if (scrollPos > 10) {
        header.classList.add('white-bg');
      } else {
        header.classList.remove('white-bg');
      }
    });
    // this.router.events.filter(e => e instanceof NavigationEnd)
    //   .subscribe((data: any) => {
    //     if (this.checkRoute(data.url)) {
    //       header.classList.add('opacity-bg');
    //     }
    //   });
  }

  scrollTo(target) {
    this.scrollService.triggerScrollTo(target);
  }

  // checkRoute(url) {
  //   return url.includes('service');
  // }
}
