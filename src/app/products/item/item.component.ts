import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'fh-item',
  templateUrl: './item.component.html',
  // providers: [MatDialogRef],
  styles: [`

`]
})
export class ItemComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(DialogDataExampleDialog, {
      // height: 'auto',
      // width: '90%',
      data: {
        animal: 'panda'
      }
    });

  }

  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  template: `<h2 mat-dialog-title>Images List</h2>
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
                      <fh-loading-spinner *ngIf='!imagesList'></fh-loading-spinner>
                      <carousel>
                        <ng-container *ngFor="let image of imagesList;">
                          <ng-container *carouselItem>
                              <img class="img-center img img-responsive" [src]="image.path">
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
      .mat-dialog-container { background: #fff }
   `]
})
export class DialogDataExampleDialog {
  imagesList = [
    {path: '../../../../assets/images/old/item_1.jpg', name: 'item 1'},
    {path: '../../../../assets/images/old/product_1.jpg', name: 'product 1'},
    {path: '../../../../assets/images/old/product_2.jpg', name: 'product 2'},
    {path: '../../../../assets/images/old/product_3.jpg', name: 'product 3'},
    {path: '../../../../assets/images/old/product_4.jpg', name: 'product 4'},
    {path: '../../../../assets/images/old/product_5.jpg', name: 'product 5'},
    {path: '../../../../assets/images/old/product_6.jpg', name: 'product 6'},
    {path: '../../../../assets/images/old/product_7.jpg', name: 'product 7'},
    {path: '../../../../assets/images/old/product_8.jpg', name: 'product 8'}
  ];
  // imagesList = [
  //   {path: '../../../../assets/images/old/item_1.jpg', name: 'item 1'},
  //   {path: '../../../../assets/images/old/item_1.jpg', name: 'item 1'},
  //   {path: '../../../../assets/images/old/item_1.jpg', name: 'item 1'},
  //   {path: '../../../../assets/images/old/item_1.jpg', name: 'item 1'},
  //   {path: '../../../../assets/images/old/item_1.jpg', name: 'item 1'},
  //   {path: '../../../../assets/images/old/item_1.jpg', name: 'item 1'},
  //   {path: '../../../../assets/images/old/item_1.jpg', name: 'item 1'},
  //   {path: '../../../../assets/images/old/item_1.jpg', name: 'item 1'},
  //   {path: '../../../../assets/images/old/item_1.jpg', name: 'item 1'}
  // ];

  /* carousel component */
  items = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
  ]

  addSlide() {
    this.items.push({
      title: `Slide 4`
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
