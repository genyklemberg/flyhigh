import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../products/product.service';
import { BlogService } from '../blog/blog.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import {Upload} from './uploads/upload';
import {UploadsService} from './uploads/uploads.service';
import {resolve} from 'q';

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
  imageFiles: FileList | null;
  currentUpload: Upload;
  categories;
  subcategories;
  items;
  article;

  constructor(private productService: ProductService,
              private blogService: BlogService,
              private upSvc: UploadsService,
              private db: AngularFireDatabase) {
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
      'subcategory': new FormControl(''),
      'title': new FormControl('', Validators.required),
      'body': new FormControl('', Validators.required),
      'item_id': new FormControl('', Validators.required)
    });

    this.blogForm = new FormGroup({
      'body': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required)
    });

  }

  imageFile(event) {
    this.imageFiles = event;
  }

  singleImgUpload(): any {
    const file = this.imageFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      return Promise.resolve(this.upSvc.pushUpload(this.currentUpload)).then((res) => {
        return res;
      });
    } else {
      console.error('No file found!');
    }
  }

  multiImgUpload(): any {
    const files = this.imageFiles;
    const storedResults = [];
    const that = this;
    if (!files || files.length === 0) {
      console.error('No Multi Files found!');
      return;
    }

    const fn = function uploadByOne(file) {
      that.currentUpload = new Upload(file);
      return Promise.resolve(that.upSvc.pushUpload(that.currentUpload)).then((res) => {
        const upload = {
          url: res.url,
          name: res.name
        };
        storedResults.push(upload);
      });
    };
    const actions = Array.from(files).map(fn);

    return Promise.all(actions).then(_ => {
      console.log(storedResults);
      return storedResults;
    });
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
    return Promise.resolve(this.multiImgUpload()).then((res) => {
      this.productService.itForm(
        this.itemsForm.value['title'],
        this.itemsForm.value['body'],
        this.itemsForm.value['item_id'],
        res
      );
      this.itemsForm.reset();
    });
  }

  addArticle() {
    return Promise.resolve(this.singleImgUpload()).then((res) => {
      console.log(res);
      this.blogService.articleForm(
        this.blogForm.value['title'],
        this.blogForm.value['body'],
        this.blogForm.value['type'],
        res.url,
        res.name
      );
      this.blogForm.reset();
    });
  }


  deleteCategory(key: string, name: string): void {
    this.db.object(`/products/category/${key}`).remove();
    this.upSvc.deleteFileStorage(name);
  }

  deleteSubcategory(key: string, name: string): void {
    this.db.object(`products/subcategory/${key}`).remove();
    this.upSvc.deleteFileStorage(name);
  }

  deleteItem(key: string, name: string): void {
    this.db.object(`/products/items/${key}`).remove();
    this.upSvc.deleteFileStorage(name);
  }

  deleteArticle(key: string, name: string): void {
    this.db.object(`/blog/${key}`).remove();
    this.upSvc.deleteFileStorage(name);
  }

}

