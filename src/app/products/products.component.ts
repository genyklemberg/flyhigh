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
  cat_id;
  category;
  subcategories;
  showSpinner = true;
  constructor(private prDB: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cat_id = this.route.snapshot.params.id;
    this.subcategories = this.prDB.getSubCategoryList(this.cat_id);
    this.prDB.getCategory(this.cat_id).subscribe(data => {
      this.category = data;
      this.showSpinner = false;
    });
  }

}
