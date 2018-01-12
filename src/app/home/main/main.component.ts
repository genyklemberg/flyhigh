import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import {ProductService} from '../../products/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import {BlogService} from '../../blog/blog.service';
declare const $: any;

@Component({
  selector: 'fh-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements AfterViewInit {
  categories;
  blogList;
  element;
  constructor(private prDB: ProductService,
              private blogDB: BlogService,
              private _sanitizer: DomSanitizer,
              public el: ElementRef) {
    this.categories = prDB.getCategoryList();
    this.blogDB.getBlogList().subscribe(data => {
      this.blogList = data;
    });
    this.element = el;
  }

  ngAfterViewInit() {
    $.getScript('assets/js/combined.js', function(){});
    // if (this.element.nativeElement.getElementsByClassName('.items_ready_1')) {}
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

}
