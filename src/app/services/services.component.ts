import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'fh-services',
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent implements OnInit {
  service;
  type;
  showSpinner = true;
  constructor(private route: ActivatedRoute, private svDB: AngularFireDatabase, private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.type = this.route.snapshot.params.type;
    this.svDB.object('/services/' + this.type).valueChanges().subscribe(data => {
      this.service = data;
      this.showSpinner = false;
    });
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

}
