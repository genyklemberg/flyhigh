import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../products/product.service';
import {BlogService} from '../blog/blog.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Upload} from './uploads/upload';
import {UploadsService} from './uploads/uploads.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'fh-admin-page',
  templateUrl: './admin-page.component.html',
  styles: [`
    .mat-expansion-panel-header {
      height: 48px;
    }
    .mat-expansion-panel-content:not(.mat-expanded):not(.ng-animating){
      display: none;
    }
    .item-card-list {
      display: flex;
      flex-flow: row wrap;
    }
    .item-card {
      max-width: 350px;
      display: inline-block;
      margin: 0 10px;
    }
  `],
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
  showSpinner = false;
  updateItem = false;

  constructor(private productService: ProductService,
              private blogService: BlogService,
              private upSvc: UploadsService,
              private db: AngularFireDatabase,
              private formBuilder: FormBuilder,
              public snackBar: MatSnackBar) {
    this.categories = productService.getCategoryList();
    this.subcategories = productService.getSubcategoryList();
    this.items = productService.getProductsList();
    this.article = blogService.getBlogList();
  }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'subtitle': new FormControl('', Validators.required),
      'body': new FormControl('', Validators.required),
      'sort': new FormControl('')
    });

    this.subCategoryForm = new FormGroup({
      'category': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'sort': new FormControl('')
    });

    this.itemsForm = new FormGroup({
      'category': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'body': new FormControl('', Validators.required),
      'sort': new FormControl(''),
      // 'item_id': new FormControl('', Validators.required)
    });

    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      text: this.formBuilder.array([
        this._initP(),
      ])
    });
  }

  addP() {
    const control = < FormArray > this.blogForm.controls['text'];
    control.push(this._initP());
  }

  removeP(i: number) {
    const control = < FormArray > this.blogForm.controls['text'];
    control.removeAt(i);
  }

  // images set and upload logic
  imageFile(event) {
    this.imageFiles = event;
  }

  singleImgUpload(): any {
    const file = this.imageFiles;
    this.imageFiles = null;
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
    this.imageFiles = null;
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
          name: res.name,
          main: res.name.startsWith('fh-main') ? true : false
        };
        storedResults.push(upload);
      });
    };
    const actions = Array.from(files).map(fn);

    return Promise.all(actions).then(_ => {
      return storedResults;
    });
  }

  // Create functions
  addCategory() {
    const sortCalc = this.categories.length + 2;
    this.showSpinner = true;

    return Promise.resolve(this.singleImgUpload()).then((res) => {
      this.productService.categoryForm(
        this.categoryForm.value['title'],
        this.categoryForm.value['subtitle'],
        this.categoryForm.value['body'],
        this.categoryForm.value['sort'],
        res.url,
        res.name
      );
      this.categoryForm.reset();
      this.showSpinner = false;
    });
  }

  addSubcategory() {
    this.showSpinner = true;
    this.productService.subForm(
      this.subCategoryForm.value['category'],
      this.subCategoryForm.value['title'],
      this.subCategoryForm.value['sort']
    );
    this.subCategoryForm.reset();
    this.showSpinner = false;
  }

  addItem() {
    this.showSpinner = true;
    return Promise.resolve(this.multiImgUpload()).then((res) => {
      this.productService.itForm(
        this.itemsForm.value['category'],
        this.itemsForm.value['title'],
        this.itemsForm.value['body'],
        this.itemsForm.value['sort'],
        res
      );
      this.itemsForm.reset();
      this.showSpinner = false;
    });
  }

  addArticle() {
    this.showSpinner = true;
    return Promise.resolve(this.singleImgUpload()).then((res) => {
      this.blogService.articleForm(
        this.blogForm.value['title'],
        this.blogForm.value['type'],
        this.blogForm.value['text'],
        res.url,
        res.name
      );
      this.blogForm.reset();
      this.showSpinner = false;
    });
  }

  selectForUpdateObject(data) {
    this.updateItem = true;
    this.itemsForm = this.formBuilder.group(data);
  }

  // update function for all types
  updateObject(type, data) {
    if (type === 'items') {
      delete this.itemsForm.value.images;
      this.productService.updateData(type, this.itemsForm.value);
    } else {
      this.productService.updateData(type, data);
    }
  }

  // delete functions
  deleteCategory(data: any): void {
    const that = this;
    Promise.resolve(this.upSvc.deleteFileStorage(data.img_name)).then(_ => {
      this.subcategories.forEach(function (res) {
        for (let i = 0; i < data.length; i++) {
          if (res[i].category === data.$key) {
            that.deleteSubcategory(res[i].$key);
          }
        }
      });
    });
    this.db.object(`/products/category/${data.$key}`).remove()
      .then(() => {
        this.snackBar.open(`Successfully deleted`, 'Ok', {
          duration: 4000
        });
      }).catch(error => this.snackBar.open(error, 'Ok', {
      duration: 4000
    }));
  }

  deleteSubcategory(key: string): void {
    const that = this;
    this.items.forEach(function (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].subcategory === key) {
          that.deleteItems(data[i].$key, data[i].images);
        }
      }
    });
    this.db.object(`products/subcategory/${key}`).remove()
      .then(() => {
        this.snackBar.open(`Successfully deleted`, 'Ok', {
          duration: 4000
        });
      }).catch(error => this.snackBar.open(error, 'Ok', {
      duration: 4000
    }));
  }

  deleteItems(key: string, names: any): void {
    const that = this;
    names.forEach(function (data) {
      return that.upSvc.deleteFileStorage(data.name);
    });
    this.db.object(`/products/items/${key}`).remove()
      .then(() => {
        this.snackBar.open(`Successfully deleted`, 'Ok', {
          duration: 4000
        });
      }).catch(error => this.snackBar.open(error, 'Ok', {
      duration: 4000
    }));
  }

  deleteItem(): void {
    const that = this;
    this.items.forEach(function (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].$key === that.itemsForm.value.$key) {
          data[i].images.forEach(function (res) {
              return that.upSvc.deleteFileStorage(res.name);
            });
        }
      }
    });
    this.db.object(`/products/items/${this.itemsForm.value.$key}`).remove()
      .then(() => {
        // this.itemsForm.reset();
        this.snackBar.open(`Successfully deleted`, 'Ok', {
          duration: 4000
        });
    }).catch(error => this.snackBar.open(error, 'Ok', {
      duration: 4000
    }));
  }

  deleteArticle(key: string, name: string): void {
    this.db.object(`/blog/${key}`).remove().then(function(){
      this.upSvc.deleteFileStorage(name);
    });
  }

  // Blog: add/remove paragraph logic
  private _initP(): any {
    return new FormGroup({
      'paragraph': new FormControl('')
    });
  }

}

