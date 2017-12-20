import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'fh-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
