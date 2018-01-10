import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {BlogService} from '../blog.service';
@Component({
  selector: 'fh-article',
  templateUrl: './article.component.html',
  styles: []
})
export class ArticleComponent implements OnInit {
  article;
  art_id;
  constructor(private blogDB: BlogService, private _sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit() {
    this.art_id = this.route.snapshot.params.id;
    this.blogDB.getArticle(this.art_id).subscribe(data => {
      this.article = data;
    });
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

}
