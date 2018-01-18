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

  mobileNav=false;

  constructor(public router: Router,
              private scrollService: ScrollService) { }

  ngOnInit() {
  }

  scrollTo(target) {
    this.scrollService.triggerScrollTo(target);
  }

  // toggleNav() {
  //   this.mobileNav=true;
  // }

}

