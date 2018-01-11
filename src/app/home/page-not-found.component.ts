import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fh-page-not-found',
  template: `
    <div class="page-not-found">
      <div class="page-not-found-wrap">
        <h1>
          Страница не найдена
        </h1>
        <a routerLink='/'>
          <button>
              Вернуться на главную страницу
          </button>
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
