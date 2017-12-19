import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cg-page-not-found',
  template: `
    <h1>Wrong page!</h1>
    <p>
      This is not a page you were looking for! The page is not exist or you made a mistake in a link.
    </p>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
