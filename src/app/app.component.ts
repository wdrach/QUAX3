// angular imports
import { Component } from '@angular/core';
import { Http } from '@angular/http';

// local imports
import { GDAX } from './gdax/gdax.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GDAX]
})
export class AppComponent {
  title = 'QUAX3';

  constructor(
    private gdax: GDAX
  ) {
    /**/
  }

  buttonClick(): void {
    this.gdax.getEthHistory(60).subscribe((result) => {
      console.log(result);
    });
  }
}
