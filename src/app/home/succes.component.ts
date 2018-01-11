import { Component, OnInit } from '@angular/core';

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
                <h2 class="display-4">Наши контакты:</h2>

                <ul class="nk-contact-info" style='text-align: right'>
                  <li>
                    <strong>Адрес:</strong><br>ул.Эжена Потье, д.12, корп.2,<br> г.Киев, Украина, 03680</li>
                  <li>
                    <strong>Телефон:</strong><br>+38 (067) 509-57-60</li>
                  <li>
                    <strong>Электронная почта:</strong><br>ak@flyhigh.com.ua, gk@flyhigh.com.ua </li>
                  <li>
                    <strong>Контактное лицо:</strong><br>Александр</li>
                </ul>
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

  constructor() { }

  ngOnInit() {
  }

}
