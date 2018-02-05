import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';
import { ICategory } from './category';
import { ISubCategory } from './subcategory';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import {FirebaseObjectObservable} from 'angularfire2/database-deprecated';

@Injectable()
export class ProductService {
  private basePath = '/products/subcategory';
  categoryRef;
  subCategoryRef;
  productsRef;

  constructor(private db: AngularFireDatabase,
              private _http: HttpClient,
              public snackBar: MatSnackBar) {
    this.categoryRef = db.list('/products/category');
    // this.subCategoryRef = db.list('/products/subcategory', ref => ref.orderByChild('category').equalTo('-L1wUoBBtST1Bh8jyhPx'));
    this.subCategoryRef = db.list('/products/subcategory');
    this.productsRef = db.list('/products/items');
  }

  /**
   * category form start
   */
  categoryForm(title: string, img: string, img_name: string) {
    const path = `products/category/`; // Endpoint on firebase
    const categoryRef: AngularFireList<any> = this.db.list(path);
    const data = {
      title: title,
      img: img,
      img_name: img_name
    };
    Promise.resolve(categoryRef.push(data)).then(() => {
      this.snackBar.open('Successfully created category', 'Ok', {
        duration: 4000
      });
    }).catch(error => this.snackBar.open(error, 'Ok', {
      duration: 4000
    }));
  }

  // private _handleError(error) {
  //   return Promise.reject(error.message ? error.message : error.toString());
  // }
  /**
   * category form end
   */

  /**
   * subCategory form
   */
  subForm(category: string, body: string, title: string, img: string, img_name: string) {
    const path = `products/subcategory/`;
    const subRef: AngularFireList<any> = this.db.list(path);
    const data = {
      category: category,
      body: body,
      title: title,
      img: img,
      img_name: img_name
    };

    Promise.resolve(subRef.push(data)).then(res => {
      // const pathForCategory = `products/category/${category}/subcategories/${res.key}`;
      // const catRef: AngularFireObject<any> = this.db.object(pathForCategory);
      // return catRef.set(data);
      const pathForCategory = `products/category/${category}/subcategories`;
      const catRef: AngularFireList<any> = this.db.list(pathForCategory);
      return catRef.update(res.key, {
        img: img,
        img_name: img_name
      });
    }).then(() => {
      this.snackBar.open(`Successfully added subcategory ${body} to ${category} category with title: ${title}`, 'Ok', {
        duration: 4000
      });
    }).catch(error => this.snackBar.open(error, 'Ok', {
      duration: 4000
    }));
  }
  /**
   * subCategory form end
   */

  /**
   * Item form
   */
  itForm(title: string, body: string, item_id: string, images) {
    const path = `products/items/`;
    const itemRef: AngularFireList<any> = this.db.list(path);
    const data = {
      title: title,
      body: body,
      item_id: item_id,
      images: images
    };

    Promise.resolve(itemRef.push(data)).then(() => {
      this.snackBar.open(`Successfully added item ${title} with description ${body} and code ${item_id}`, 'Ok', {
        duration: 4000
      });
    }).catch(error => this.snackBar.open(error, 'Ok', {
      duration: 4000
    }));
  }
  /**
   * Item form end
   */

  // Return an observable list of Products
  getSubCategoryList(): Observable<ISubCategory[]> {
      return this.subCategoryRef.snapshotChanges().map((arr) => {
        return arr.map((snap) => Object.assign(snap.payload.val(), {$key: snap.key}));
      });
  }

  getSubCategoryFiltered(category) {
    return this.subCategoryRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), {$key: snap.key}))
        .filter(val => val.category === category);
    });
  }

  // Return an observable list of Products
  getCategoryList(): Observable<ICategory[]> {
    return this.categoryRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }));
    });
  }

  // Return an observable list of Products
  getProductsList(): Observable<IProduct[]> {
    return this.productsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }) );
    });
  }

  // Return a single observable category
  getCategory(key: string): Observable<ICategory | null> {
    const categoryPath = `/products/category/${key}`;
    const category = this.db.object(categoryPath).valueChanges() as Observable<ICategory | null>;
    return category;
  }

  // Return a single observable product
  getProduct(key: string): Observable<IProduct | null> {
    const productPath = `${this.basePath}/${key}`;
    const product = this.db.object(productPath).valueChanges() as Observable<IProduct | null>;
    return product;
  }

  // Create a brand new product
  createProduct(product: IProduct): void {
    this.productsRef.push(product);
  }

  // Update an exisiting product
  updateProduct(key: string, value: any): void {
    this.productsRef.update(key, value);
  }

  // Deletes a single product
  deleteProduct(key: string): void {
    this.productsRef.remove(key);
  }

  // Deletes the entire list of products
  deleteAll(): void {
    this.productsRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }

}
