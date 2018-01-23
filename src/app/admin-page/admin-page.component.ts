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
  categoryForm: FormGroup;
  subCategoryForm: FormGroup;
  itemsForm: FormGroup;
  categories;
  subcategories;
  categoriesRef;

  constructor(private productService: ProductService,
              private router: Router,
              private db: AngularFireDatabase) {
    this.categoriesRef = db.list('/products/category');
    this.categories = productService.getCategoryList();
    this.subcategories = productService.getSubCategoryList(this.categories);
    console.log('subcategories: ', this.subcategories);// return Observable
                                            // {_isScalar: false, source: Observable, operator: MapOperator}
    console.log('this.categories: ', this.categories);
  }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'img': new FormControl('')
    });

    this.subCategoryForm = new FormGroup({
      'category': new FormControl(''),
      'body': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required)
    });

    this.itemsForm = new FormGroup({
      'body': new FormControl('', Validators.required)
    })

  }

  createNewCategory() {
    if(this.categoryForm.value.title.length === 0) {
      return false;
    }
    const promise = new Promise((resolve, reject) => {
      this.productService.newForm(
          this.categoryForm.value['title'],
          this.categoryForm.value['img']
      );
      this.categoryForm.reset();
    });
  }

  addSubCategory() {
    const promise = new Promise((resolve, reject) => {
      this.productService.subForm(
          this.subCategoryForm.value['category'],
          this.subCategoryForm.value['body'],
          this.subCategoryForm.value['title']
      );
      this.subCategoryForm.reset();
    });
  }

  createItems() {
    const promise = new Promise((resolve, reject) => {
      this.productService.itForm(
          this.itemsForm.value['body']
      );
      this.itemsForm.reset();
    });
  }

  deleteCategory(key: string):void {
    this.db.object(`/products/category/${key}`).remove();
  }

}

