import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { MatSnackBar } from '@angular/material';

// Import RxJs required methods
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';



@Injectable()
export class MailService {

  // private apiUrl = 'https://us-central1-flyhigh-5416b.cloudfunctions.net/';
  private apiUrl = 'http://localhost:5000';


  constructor(private _http: HttpClient,
              private db: AngularFireDatabase,
              public snackBar: MatSnackBar,
              private router: Router) { }

  sendFormData(text) {
    console.log(text);
    const method = 'httpEmail';
    // const bodyString = JSON.stringify({text: text});
    const _headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.apiUrl + method, text, { headers: _headers })
      .toPromise()
      .catch(this._handleError);
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
    this.sendFormData(data)
      .catch(error => {
        console.log(error);
        this.snackBar.open(error, 'Ok', {
          duration: 4000
        });
      });
    userRef.update(data)
      .catch(error => this.snackBar.open(error, 'Ok', {
        duration: 4000
      }));
  }

  private _handleError(error) {
    return Promise.reject(error.message ? error.message : error.toString());
  }
}
