import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fh-products',
  templateUrl: './products.component.html',
  styles: [`
    .work {
      -moz-box-shadow: 0 0 0 1px #fff;
      -webkit-box-shadow: 0 0 0 1px #fff;
      box-shadow: 0 0 0 1px #fff;
      overflow: hidden;
      position: relative;
    }
    .work img {
      width: 100%;
      height: 100%;
    }
    .work .overlay {
      background: rgba(232, 69, 69, 0.9);
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
      -moz-transition: opacity, 0.3s;
      -o-transition: opacity, 0.3s;
      -webkit-transition: opacity, 0.3s;
      transition: opacity, 0.3s;
    }
    .work .overlay-caption {
      position: absolute;
      text-align: center;
      top: 50%;
      width: 100%;
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .work h5, .work p, .work img {
      -moz-transition: all, 0.5s;
      -o-transition: all, 0.5s;
      -webkit-transition: all, 0.5s;
      transition: all, 0.5s;
    }
    .work h5, .work p {
      color: #fff;
      margin: 0;
      opacity: 0;
    }
    .work span {
      font-size: 45px;
    }
    .work h5 {
      margin-bottom: 5px;
      -moz-transform: translate3d(0, -200%, 0);
      -ms-transform: translate3d(0, -200%, 0);
      -webkit-transform: translate3d(0, -200%, 0);
      transform: translate3d(0, -200%, 0);
    }
    .work p {
      -moz-transform: translate3d(0, 200%, 0);
      -ms-transform: translate3d(0, 200%, 0);
      -webkit-transform: translate3d(0, 200%, 0);
      transform: translate3d(0, 200%, 0);
    }
    .work-box:hover img {
      -moz-transform: scale(1.2);
      -ms-transform: scale(1.2);
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    .work-box:hover .overlay {
      opacity: 1;
    }
    .work-box:hover .overlay h5, .work-box:hover .overlay p {
      opacity: 1;
      -moz-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  `]
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
