import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'fh-uploads-form',
  templateUrl: './uploads-form.component.html',
  styles: []
})
export class UploadsFormComponent {

  selectedFiles: FileList | null;
  @Input() showMulti = true;
  @Input() currentUpload: number;
  @Output() newFiles: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
    this.passFiles();
  }

  passFiles() {
    const file = this.selectedFiles;
    this.newFiles.emit(file);
  }
}
