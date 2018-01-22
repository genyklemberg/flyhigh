import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductService } from "../products/product.service";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: 'fh-admin-page',
  templateUrl: './admin-page.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class AdminPageComponent implements OnInit {
  adminForm: FormGroup;
  categories;
  categoriesRef;

  constructor(private productService: ProductService,
              private router: Router,
              private db: AngularFireDatabase) {
    this.categoriesRef = db.list('/products/category');
    this.categories = productService.getCategoryList();
  }

  ngOnInit() {
    this.adminForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'img': new FormControl('')
    });

  }
  createNewCategory() {
    if(this.adminForm.value.title.length === 0) {
      return false;
    }
    const promise = new Promise((resolve, reject) => {
      this.productService.newForm(
          this.adminForm.value['title'],
          this.adminForm.value['img']
      );
      this.adminForm.reset();
    });

  }

  deleteCategory(key: string):void {
    this.db.object(`/products/category/${key}`).remove();
  }

}

