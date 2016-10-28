import { Component } from '@angular/core';

import { ApiService } from './shared';

import '../style/app.css';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';

  constructor(private api: ApiService) {
    // Do something with api
  }
}
