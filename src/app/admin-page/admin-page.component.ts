import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductService } from "../products/product.service";
import { BlogService } from "../blog/blog.service";
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
  blogForm: FormGroup;
  categories;
  subcategories;
  items;
  article;
  categoriesRef;

  constructor(private productService: ProductService,
              private blogService: BlogService,
              private router: Router,
              private db: AngularFireDatabase) {
    this.categoriesRef = db.list('/products/category');
    this.categories = productService.getCategoryList();
    this.subcategories = productService.getSubCategoryList();
    this.items = productService.getProductsList();
    this.article = blogService.getBlogList();
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
      'title': new FormControl('', Validators.required),
      'body': new FormControl('', Validators.required),
      'item_id': new FormControl('', Validators.required)
    });

    this.blogForm = new FormGroup({
      'body': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required),
      'img': new FormControl('')
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
          this.itemsForm.value['title'],
          this.itemsForm.value['body'],
          this.itemsForm.value['item_id']

      );
      this.itemsForm.reset();
    });
  }


  addArticle() {
    const promise = new Promise((resolve, reject) => {
      this.blogService.articleForm(
          this.blogForm.value['body'],
          this.blogForm.value['title'],
          this.blogForm.value['type'],
          this.blogForm.value['img']
      );
      this.blogForm.reset();
    });
  }

  deleteCategory(key: string):void {
    this.db.object(`/products/category/${key}`).remove();
  }

  deleteSubcategory(key:string):void {
    this.db.object(`products/subcategory/${key}`).remove();
  }

  deleteItem(key:string):void {
    this.db.object(`/products/items/${key}`).remove();
  }

  deleteArticle(key:string):void {
    this.db.object(`/blog/${key}`).remove();
  }

}

