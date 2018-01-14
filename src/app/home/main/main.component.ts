import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import {ProductService} from '../../products/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import {BlogService} from '../../blog/blog.service';
import {MailService} from '../../mail.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
declare const $: any;

@Component({
  selector: 'fh-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements AfterViewInit, OnInit {
  categories;
  blogList;
  element;
  profileForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  body = {
    from: 'test@test.com',
    subject: 'Test component',
    html: '<h1>My</h1><br><p>html indeed</p>'
  };
  constructor(private prDB: ProductService,
              private blogDB: BlogService,
              private mailService: MailService,
              private router: Router,
              private _sanitizer: DomSanitizer,
              public el: ElementRef) {
    this.categories = prDB.getCategoryList();
    this.blogDB.getBlogList().subscribe(data => {
      this.blogList = data;
    });
    this.element = el;
  }

  ngOnInit() {
    this.profileForm = new FormGroup({
      'name': new FormControl('', [Validators.required,  Validators.minLength(2)]),
      'email': new FormControl('', [Validators.required,
        Validators.email, Validators.pattern(this.emailPattern)]),
      'topic': new FormControl('', [Validators.required,  Validators.minLength(2)]),
      'textarea': new FormControl('', [Validators.required,  Validators.minLength(5)])
    });
  }

  ngAfterViewInit() {
    $.getScript('assets/js/combined.js', function(){});
    // if (this.element.nativeElement.getElementsByClassName('.items_ready_1')) {}
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  onSubmit() {
    const promise = new Promise((resolve, reject) => {
      this.mailService.newForm(
        this.profileForm.value['name'],
        this.profileForm.value['email'],
        this.profileForm.value['topic'],
        this.profileForm.value['textarea']
      );
      this.router.navigate(['/success']);
    });
  }
  //
  // send() {
  //   this.mailService.sendFormData(this.body);
  // }

}
