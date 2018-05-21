import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {IArticle} from './article';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class BlogService {
  blogRef;
  Date = new Date().getTime();

  constructor(private db: AngularFireDatabase,
              public snackBar: MatSnackBar) {
    this.blogRef = db.list('/blog', ref => ref.orderByChild('timeStamp'));
  }

  /**
   * Article form
   */
  articleForm(title: string, type: string, text: any, img: string, img_name: string) {
    const path = `/blog`;
    const date = Date.now();
    const userRef: AngularFireList<any> = this.db.list(path);
    const data = {
      title: title,
      type: type,
      text: text,
      timeStamp: date,
      img: img,
      img_name: img_name
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
      return arr.map((snap) => Object.assign(snap.payload.val(), {$key: snap.key}));
    });
  }

  // Return a single observable Article
  getArticle(key?: string): Observable<IArticle | null> {
    const articlePath = `/blog/${key}`;
    const article = this.db.object(articlePath).valueChanges() as Observable<IArticle | null>;
    return article;
  }
}

