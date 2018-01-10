import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject, DatabaseQuery} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {IProduct} from './product';
import {ICategory} from './category';
import {ISubCategory} from './subcategory';

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

  // productsRef: AngularFireList<IProduct>;
  // productRef:  AngularFireObject<IProduct>;

  constructor(private db: AngularFireDatabase) {
    this.categoryRef = db.list('/products/category');
    // this.subCategoryRef = db.list('/products/subcategory', ref => ref.orderByChild('category').equalTo('-L1wUoBBtST1Bh8jyhPx'));
    this.subCategoryRef = db.list('/products/subcategory');
    this.productsRef = db.list('/products/items');
  }


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
