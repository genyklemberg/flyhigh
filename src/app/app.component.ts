import { Component } from '@angular/core';

@Component({
  selector: 'fh-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  onDeactivate() {
    document.body.scrollTop = 0;
  }
}
