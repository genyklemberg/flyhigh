import {Component, OnInit} from '@angular/core';
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
  items;
  showSpinner = true;

  constructor(private prDB: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cat_id = this.route.snapshot.params.id;
    this.subcategories = this.prDB.getSubcategoryFiltered(this.cat_id);
    this.items = this.prDB.getProductsList();
    this.prDB.getCategory(this.cat_id).subscribe(data => {
      this.category = data;
      this.showSpinner = false;
    });
  }

}
