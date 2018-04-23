import {Component, OnInit, Inject, ViewEncapsulation, OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'fh-item',
  templateUrl: './item.component.html',
  // providers: [MatDialogRef],
  styles: []
})
export class ItemComponent implements OnInit, OnDestroy{
  id;
  item;
  showSpinner = true;
  constructor(private router: ActivatedRoute, private db: AngularFireDatabase ,public dialog: MatDialog) {}

  ngOnInit() {
    this.id = this.router.snapshot.params.id;
    this.db.object('/products/items/' + this.id).valueChanges().subscribe(data => {
      this.item = data;
      this.showSpinner = false;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      data: this.item.images
    });
  }

  ngOnDestroy(){
    this.dialog.closeAll();
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  template: `<h2 mat-dialog-title>Галерея</h2>
            <!-- START: Pagination -->
            <!--<div class="nk-pagination nk-pagination-center">-->
              <!--<div class="container cont-img">-->
                <!--<a class="nk-pagination-prev prev" href="#">-->
                    <!--<span class="pe-7s-angle-left"></span> Prev Image-->
                <!--</a>-->
               
                <!--<div *ngFor="let image of imagesList">-->
                    <!--<img class="img-center" [src]="image.path">-->
                <!--</div>-->
                
                <!-- todo based on https://netbasal.com/building-a-simple-carousel-component-with-angular-3a94092b7080-->
                <div class="container">
                  <div class="row">
                    <div class="col-md-12">
                      <fh-loading-spinner *ngIf='!images'></fh-loading-spinner>
                      <carousel>
                        <ng-container *ngFor="let image of images">
                          <ng-container *carouselItem>
                              <img class="img-center img img-responsive" [src]="image.url">
                            <!--<div class="item">{{image.path}}</div>-->
                          </ng-container>
                        </ng-container>
                      </carousel>
                    </div>
                  </div>
                </div>
  
                <!--<a class="nk-pagination-next next" href="#">Next Image -->
                    <!--<span class="pe-7s-angle-right"></span> -->
                <!--</a>-->
              <!--</div>-->
            <!--</div>-->
            <!-- END: Pagination -->`,
  encapsulation: ViewEncapsulation.None,
  styles: [`
      .mat-dialog-container { 
        background: #fff;
        padding: 75px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
   `]
})
export class DialogDataExampleDialog {
  images;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.images = data;
  }


  // addSlide() {
  //   this.items.push({
  //     title: `Slide 4`
  //   });
  // }
}
