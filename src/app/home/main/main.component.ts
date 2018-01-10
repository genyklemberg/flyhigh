import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ProductService} from '../../products/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {BlogService} from '../../blog/blog.service';
declare const $: any;

@Component({
  selector: 'fh-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit, AfterViewInit {
  categories;
  blogList;
  constructor(private prDB: ProductService,
              private blogDB: BlogService,
              private _sanitizer: DomSanitizer) {
    this.categories = prDB.getCategoryList();
    this.blogList = this.blogDB.getBlogList();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.categories && this.blogList) {
      setTimeout(function() {
        $.getScript('assets/js/combined.js', function(){});
      }, 100);
    }
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

}
