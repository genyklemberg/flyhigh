import { Component, OnInit } from '@angular/core';
import {BlogService} from './blog.service';

@Component({
  selector: 'fh-blog',
  templateUrl: './blog.component.html',
  styles: []
})
export class BlogComponent implements OnInit {
  blogList;
  constructor(private blogDB: BlogService) {
    this.blogList = this.blogDB.getBlogList();
  }

  ngOnInit() {
  }



}
