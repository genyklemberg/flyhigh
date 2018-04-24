import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'fh-success',
  template: `
    <div class="success">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <div class="succses-photo">
              <img
                style='height: 80%; border-radius: 2%;'
                src="assets/images/old/stw.jpeg">
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="success-text">
              <h2>
                Ваш запрос успешно отправлен
              </h2>
              <h4>
                Благодарим вас за интерес к нашей компании
              </h4>
              <p>
                Мы ответим на Ваш запрос в течение 24 часов (в рабочие дни).
              </p>
              <a routerLink='/'>
                <button>
                  <div>вернуться на главную страницу сайта</div><i class="fa fa-angle-right" aria-hidden="true"></i>
                </button>
              </a>
              <div class="contact-info adress">
                <!-- START: Info -->
                <fh-contacts></fh-contacts>
                <!-- END: Info -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SuccesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
