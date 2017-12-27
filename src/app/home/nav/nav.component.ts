import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ScrollService} from '../../scroll.service';

@Component({
  selector: 'fh-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {

  constructor(public router: Router,
              private scrollService: ScrollService) { }

  ngOnInit() {
  }

  scrollTo(target) {
    this.scrollService.triggerScrollTo(target);
  }

}

