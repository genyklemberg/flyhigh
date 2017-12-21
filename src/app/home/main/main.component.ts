import {Component, OnInit, AfterViewInit} from '@angular/core';
declare const $: any;

@Component({
  selector: 'fh-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    $.getScript('assets/js/combined.js', function(){});
  }

}
