import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
// Import RxJs required methods
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class MailService {

  // private apiUrl = 'https://us-central1-flyhigh-5416b.cloudfunctions.net/';
  private apiUrl = 'http://localhost:5000/flyhigh-5416b/us-central1/';

  constructor(private _http: HttpClient,
              private db: AngularFireDatabase,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  sendFormData(text) {
    const method = 'httpEmail';
    const _headers = new HttpHeaders().set('Content-Type', 'application/json');
    this._http.post(this.apiUrl + method, text, {headers: _headers}).subscribe((data: any) => {
      console.log((data.success));
      if (data.success) {
        return this.router.navigate(['success']);
      } else {
        this.snackBar
          .open(`Ваш запрос не был отправлен, попробуйте еще раз или свяжитесь с агентом`, 'Ok', {
            duration: 4000
          });
      }
    });
  }

  newForm(name: string, email: string, topic: string, textarea: string) {
    const dateObj = new Date();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const date = ('0' + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    const dateString = year + '_' + month + '_' + date;
    const path = `requests/${dateString}`; // Endpoint on firebase
    const userRef: AngularFireObject<any> = this.db.object(path);
    const data = {
      name: name,
      from: email,
      subject: topic,
      text: textarea
    };
    Promise.resolve(userRef.update(data)).then(_ => {
      this.sendFormData(data);
    }).then(_ => {
      return;
    });
  }

  // private _handleError(error) {
  //   return Promise.reject(error.message ? error.message : error.toString());
  // }
}
