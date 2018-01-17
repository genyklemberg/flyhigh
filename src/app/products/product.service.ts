import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject, DatabaseQuery} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {IProduct} from './product';
import {ICategory} from './category';
import {ISubCategory} from './subcategory';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ProductService {
  private basePath = '/products/subcategory';
  categoryRef;
  subCategoryRef;
  productsRef;
  data = {
    title: 'Маски',
    body: 'От классики до модерна... ' +
    'Мы предлагаем широкий спектр специально разработанных дорожных наборов в различных стилях и на любой бюджет.' +
    '\n' +
    'Мы можем разработать уникальный дизайн,  ' +
    'чтобы отразить неповторимый стиль вашей компании и привлечь внимание ваших клиентов. ' +
    'Если вы свяжетесь с нами и расскажите немного больше о вас и ваших клиентах, ' +
    'мы сможем предоставить вам  решение, которое наилучшим образом будет соответствовать вашим требованиям.',
    img: 'assets/images/old/product_2.jpg',
    category: '-L1wUoBBtST1Bh8jyhPx',
    items: ['-L1wl2hN0hvmTN6ITyQg', '-L1wlXTLJvy5owN5ipbp', '-L1wkmNlD_N4nxlnpxjc']
  };

  private apiUrl = 'https://us-central1-flyhigh-5416b.cloudfunctions.net/';

  // productsRef: AngularFireList<IProduct>;
  // productRef:  AngularFireObject<IProduct>;

  constructor(private db: AngularFireDatabase,
              private _http: HttpClient,
              public snackBar: MatSnackBar) {
    this.categoryRef = db.list('/products/category');
    // this.subCategoryRef = db.list('/products/subcategory', ref => ref.orderByChild('category').equalTo('-L1wUoBBtST1Bh8jyhPx'));
    this.subCategoryRef = db.list('/products/subcategory');
    this.productsRef = db.list('/products/items');
  }

  /**
   * admin form start
   */
  sendFormData(text) {
    console.log(text);
    const method = 'httpEmail';
    // const bodyString = JSON.stringify({text: text});
    const _headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.apiUrl + method, text, { headers: _headers })
        .toPromise()
        .catch(this._handleError);
  }

  newForm(comment: string) {
    const date = new Date().toUTCString();
    const path = `test/category/${date}`; // Endpoint on firebase
    const userRef: AngularFireObject<any> = this.db.object(path);
    const data = {
      comment: comment
    };
    this.sendFormData(data)
        .catch(error => this.snackBar.open(error, 'Ok', {
          duration: 4000
        }));
    userRef.update(data)
        .catch(error => this.snackBar.open(error, 'Ok', {
          duration: 4000
        }));
  }
  private _handleError(error) {
    return Promise.reject(error.message ? error.message : error.toString());
  }

  /**
   * admin form end
   */

  createDB(): void {
    this.subCategoryRef.push(this.data);
  }

  // Return an observable list of Products
  getSubCategoryList(category): Observable<ISubCategory[]> {
    return this.subCategoryRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }))
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
