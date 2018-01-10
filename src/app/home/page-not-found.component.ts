import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cg-page-not-found',
  template: `
    <div class="page-not-found">
      <div class="page-not-found-wrap">
        <h1>
          Страница не найдена
        </h1>
        <button>
          Вернуться на главную страницу
        </button>
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
