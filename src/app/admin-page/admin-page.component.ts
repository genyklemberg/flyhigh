import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ProductService } from "../products/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'fh-admin-page',
  templateUrl: './admin-page.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class AdminPageComponent implements OnInit {
  adminForm: FormGroup;
  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.adminForm = new FormGroup({
      'comment': new FormControl('')
    });
  }
  leaveComment() {
    const promise = new Promise((resolve, reject) => {
      this.productService.newForm(
          this.adminForm.value['comment']
      );
      //this.router.navigate(['/success']);
      this.adminForm.reset();
    });
  }

}

