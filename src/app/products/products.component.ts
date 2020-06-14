import {Component, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';

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
    // this.subcategories = this.prDB.getSubcategoryFiltered(this.cat_id);
    // this.categories = this.prDB.getSubcategoryFiltered(this.cat_id);
    this.items = this.prDB.getProductsListFiltered(this.cat_id).pipe(
      tap(res => res.sort((a,b) => Number(a.sort) < Number(b.sort) ? -1 : 1))
    );
    this.prDB.getCategory(this.cat_id).subscribe(data => {
      this.category = data;
      this.showSpinner = false;
    });
  }

  selectMain(images) {
    const imageIndex = images.findIndex(p => p.main === true);
    if (imageIndex !== -1) {
      return images[imageIndex].url;
    }
    return images[0].url;
  }

}
