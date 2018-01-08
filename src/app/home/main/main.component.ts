import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ProductService} from '../../products/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
declare const $: any;

@Component({
  selector: 'fh-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit, AfterViewInit {
  categories;
  constructor(private prDB: ProductService, private _sanitizer: DomSanitizer) {
    this.categories = prDB.getCategoryList();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    $.getScript('assets/js/combined.js', function(){});
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

}
