import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Md5} from 'ts-md5/dist/md5';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class AdminPageGuard implements CanActivate {
  admin;
  person;

  constructor(private db: AngularFireDatabase) {
    this.admin = this.getAdmin();
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.getAdmin().map((data) => {
      this.person = prompt('Please enter your password');
      if (Md5.hashStr(this.person) === data.pass) {
        return true;
      } else {
        return false;
      }
    });

  }

  getAdmin(): Observable<any> {
    const data = this.db.object('/admin').valueChanges() as Observable<any>;
    return data;
  }
}
