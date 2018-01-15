import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class ScrollService {

  constructor(private _scrollToService: ScrollToService) { }

  public triggerScrollTo(target) {

    /**
     * @see NOTE:1
     */
    const config: ScrollToConfigOptions = {
      target: target,
      duration: 1000,
      easing: 'easeInCubic',
    };
    if (target === 'contacts') {
      const that = this;
      setTimeout(function () {
        console.log('scroll delay' + config.target);
        that._scrollToService.scrollTo(config);
      }, 1000);
    } else {
    console.log('scroll works now');
    this._scrollToService.scrollTo(config);
  }
  }
}
