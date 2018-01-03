import {Component, Injectable, OnInit} from '@angular/core';
import {IProduct} from './product';
import {ProductService} from './product.service';

@Component({
  selector: 'fh-products',
  templateUrl: './products.component.html',
  styles: [],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  products;
  product = {
    title: 'дорожная',
    img: 'assets/somepic.png'
  };
  constructor(public db: ProductService) {
    this.products = db.getProductsList();
  }

  ngOnInit() {
    // this.db.createProduct(this.product);
  }

}
