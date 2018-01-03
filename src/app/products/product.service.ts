import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {IProduct} from './product';

@Injectable()
export class ProductService {
  private basePath = '/products/тапки';

  productsRef: AngularFireList<IProduct>;
  productRef:  AngularFireObject<IProduct>;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.basePath);
  }

  // Return an observable list of Products
  getProductsList(): Observable<IProduct[]> {
    return this.productsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }) );
    });
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
