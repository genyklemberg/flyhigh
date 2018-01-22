import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ScrollService} from '../../scroll.service';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'fh-nav',
  templateUrl: './nav.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {

  constructor(public router: Router,
              private scrollService: ScrollService) { }

  ngOnInit() {

    window.addEventListener('scroll', function() {
      // //Here you forgot to update the value
      const scrollpos = window.scrollY;
      const header = document.getElementById('header');

      if (scrollpos > 10) {
        header.classList.add('white-bg');
      } else {
        header.classList.remove('white-bg');
      }
    });
  }

  scrollTo(target) {
    this.scrollService.triggerScrollTo(target);
  }

}

