import {Component, OnInit, AfterViewInit} from '@angular/core';
declare const jscript: any;

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
    // if (js) {
    //   setTimeout(function() {
    //     js.getScript('assets/js/combined.js', function(){});
    //   }, 10);
    // }
    jscript.getScript('assets/js/combined.js', function(){});
  }

}
