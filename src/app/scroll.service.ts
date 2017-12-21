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

    this._scrollToService.scrollTo(config);
  }
}
