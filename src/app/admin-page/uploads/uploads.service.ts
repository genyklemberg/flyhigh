import {Injectable} from '@angular/core';
import {Upload} from './upload';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadsService {
  basePath = 'uploads';
  uploads: Observable<Upload[]>;

  constructor(private db: AngularFireDatabase) {
  }

  getUploads() {
    this.uploads = this.db.list(this.basePath).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return {$key, ...data};
      });
    });
    return this.uploads;
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const fileName = upload.file.name + Date.now();
    return Promise.resolve(storageRef.child(`${this.basePath}/${fileName}`).put(upload.file)).then(function (snapshot: any) {
      upload.name = fileName;
      upload.url = snapshot.downloadURL;
      return upload;
    });
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
