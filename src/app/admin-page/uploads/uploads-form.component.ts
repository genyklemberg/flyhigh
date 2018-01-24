import { Component } from '@angular/core';
import {Upload} from './upload';
import {UploadsService} from './uploads.service';

@Component({
  selector: 'fh-uploads-form',
  templateUrl: './uploads-form.component.html',
  styles: []
})
export class UploadsFormComponent {

  selectedFiles: FileList | null;
  currentUpload: Upload;

  constructor(private upSvc: UploadsService) { }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this.upSvc.pushUpload(this.currentUpload);
    } else {
      console.error('No file found!');
    }
  }

  uploadMulti() {
    const files = this.selectedFiles;
    if (!files || files.length === 0) {
      console.error('No Multi Files found!');
      return;
    }

    Array.from(files).forEach((file) => {
      this.currentUpload = new Upload(file);
      this.upSvc.pushUpload(this.currentUpload);
    });
  }
}
