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

    //use window.scrollY
  var scrollpos = window.scrollY;
  var header = document.getElementById("header");


  window.addEventListener('scroll', function(){ 
      //Here you forgot to update the value
      scrollpos = window.scrollY;
      header = document.getElementById("header");

      if(scrollpos > 10){
        header.classList.add("white-bg");
        console.log('scroll to bottom');
      }
      else {
        header.classList.remove("white-bg")
        console.log('top of page');
      }
      console.log(scrollpos);
  });

};

