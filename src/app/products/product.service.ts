import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {IProduct} from './product';
import {ICategory} from './category';
import {ISubcategory} from './subcategory';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ProductService {
  categoryRef;
  subCategoryRef;
  productsRef;
  private basePath = '/products/subcategory';

  constructor(private db: AngularFireDatabase,
              private _http: HttpClient,
              public snackBar: MatSnackBar) {
    this.categoryRef = db.list('/products/category', ref => ref.orderByChild('sort'));
    // this.subCategoryRef = db.list('/products/subcategory', ref => ref.orderByChild('category').equalTo('-L1wUoBBtST1Bh8jyhPx'));
    this.subCategoryRef = db.list('/products/subcategory', ref => ref.orderByChild('sort'));
    this.productsRef = db.list('/products/items', ref => ref.orderByChild('sort'));
  }

  /**
   * category form start
   */
  categoryForm(title: string, subtitle: string, body: string, sort: number, img: string, img_name: string) {
    // const path = `products/category/`; // Endpoint on firebase
    // const categoryRef: AngularFireList<any> = this.db.list(path);
    const sortVal = ((sort) ? sort : 0);
    const data = {
      title: title,
      subtitle: subtitle,
      body: body,
      sort: sortVal,
      img: img,
      img_name: img_name
    };
    Promise.resolve(this.categoryRef.push(data)).then(() => {
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
  subForm(category: string, title: string, sort: number) {
    // const path = `products/subcategory/`;
    // const subRef: AngularFireList<any> = this.db.list(path);
    const sortVal = ((sort) ? sort : 0);
    const data = {
      category: category,
      title: title,
      sort: sortVal
    };

    Promise.resolve(this.subCategoryRef.push(data)).then(() => {
      this.snackBar.open(`Successfully added subcategory ${title} to ${category}`, 'Ok', {
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
  itForm(category: string, title: string, body: string, sort: number, images) {
    // const path = `products/items/`;
    // const itemRef: AngularFireList<any> = this.db.list(path);
    const sortVal = ((sort) ? sort : 0);
    const data = {
      category: category,
      title: title,
      body: body,
      sort: sortVal,
      images: images
    };

    Promise.resolve(this.productsRef.push(data)).then(() => {
      this.snackBar.open(`Successfully added item ${title} with description ${body}`, 'Ok', {
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
  getCategoryList(): Observable<ICategory[]> {
    return this.categoryRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  // Return an observable list of Products
  getSubcategoryList(): Observable<ISubcategory[]> {
    return this.subCategoryRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  getSubcategoryFiltered(category) {
    return this.subCategoryRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), {$key: snap.key}))
        .filter(val => val.category === category);
    });
  }

  // Return an observable list of Products
  getProductsList(): Observable<IProduct[]> {
    return this.productsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), {$key: snap.key}));
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

  // Update an existing category
  updateData(type, data: any): void {
    const objectRef = this.db.object(`/products/${type}/${data.$key}`);
    delete data.$key;
    objectRef.update(data).then(_ => {
      this.snackBar.open(`Successfully updated ${type}`, 'Ok', {
        duration: 4000
      });
    }).catch(error => {
      this.snackBar.open(error, 'Ok', {
        duration: 4000
      });
    });
  }

// Create a brand new product
  // createProduct(product: IProduct): void {
  //   this.productsRef.push(product);
  // }
  //
  // // Update an exisiting product
  // updateProduct(key: string, value: any): void {
  //   this.productsRef.update(key, value);
  // }
  //
  // // Deletes a single product
  // deleteProduct(key: string): void {
  //   this.productsRef.remove(key);
  // }
  //
  // // Deletes the entire list of products
  // deleteAll(): void {
  //   this.productsRef.remove();
  // }
  //
  // // Default error handling for all actions
  // private handleError(error: Error) {
  //   console.error(error);
  // }
  //

}
