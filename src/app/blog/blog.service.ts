import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject, DatabaseQuery} from 'angularfire2/database';
import {IArticle} from './article';
import {Observable} from 'rxjs/Observable';
import { MatSnackBar } from "@angular/material";

@Injectable()
export class BlogService {
  blogRef;
  Date = new Date().getTime();
  data: IArticle = {
    title: 'Ten things about Photography',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus orci a purus lacinia consectetur. Vestibulum rutrum ex in odio placerat dictum. Morbi sit amet tortor mollis, tincidunt magna a, iaculis nisl. Cras varius odio a arcu rutrum, nec posuere lacus imperdiet. Proin iaculis, nibh eleifend elementum pulvinar, erat nisl consequat quam, ac ornare est sem nec libero. Fusce ac sagittis quam. Phasellus mattis, nunc a venenatis laoreet, est ipsum consectetur turpis, in ullam corper urna tortor eu purus.' +
  'Quisque cursus risus id ante fermentum, in auctor quam consectetur. Vestibulum est nisi, tempus ac vehicula sit amet, blandit et sapien. Ut congue dui enim, at viverra nisl tempor a. Donec in enim nec massa lacinia porta. Nullam lobortis, enim aliquam congue bibendum, libero turpis tincidunt enim, vel dapibus justo lectus et risus. Proin eget mi a tortor laoreet dictum.',
    img: 'assets/images/post-9-mid.jpg',
    type: 'услуги',
    timeStamp: this.Date
  };


  constructor(private db: AngularFireDatabase,
              public snackBar: MatSnackBar) {
    this.blogRef = db.list('/blog');
  }

  /**
   * Article form
   */
  articleForm(title: string, body: string, type: string, img: string) {
    const path = `/blog`;
    const userRef: AngularFireList<any> = this.db.list(path);
    const data = {
      title: title,
      body: body,
      type: type,
      img: img
    };

    console.log('blog data:', data);
    Promise.resolve(userRef.push(data)).then(() => {
      this.snackBar.open(`Successfully added article ${title}`, 'Ok', {
        duration: 4000
      });
    }).catch(error => this.snackBar.open(error, 'Ok', {
      duration: 4000
    }));
  }
  /**
   * Article form end
   */

  // createDB(): void {
  //   this.blogRef.push(this.data);
  //   console.log(this.Date);
  // }

  // Return an observable list of Articles
  getBlogList(): Observable<IArticle[]> {
    return this.blogRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }));
    });
  }

  // Return a single observable Article
  getArticle(key?: string): Observable<IArticle | null> {
    const articlePath = `/blog/${key}`;
    const article = this.db.object(articlePath).valueChanges() as Observable<IArticle | null>;
    return article;
  }
}

