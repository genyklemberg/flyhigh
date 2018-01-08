import {Component, Injectable, OnInit} from '@angular/core';
import {IProduct} from './product';
import {ProductService} from './product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'fh-products',
  templateUrl: './products.component.html',
  styles: [],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  category;
  subcategories;
  constructor(private prDB: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.category = this.route.snapshot.params.id;
    this.subcategories = this.prDB.getSubCategoryList(this.category);
  }

}
