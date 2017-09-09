// angular imports
import { Injectable, NgModule } from '@angular/core';
import { Http, Response, RequestOptionsArgs, URLSearchParams } from '@angular/http';

// rxjs imports
import { Observable } from 'rxjs/Observable';

// models
import { Candle } from './../models/models';

const server = 'https://api.gdax.com';

@Injectable()
@NgModule({
  providers: [Http]
})
export class GDAX {
  constructor(
    private http: Http
  ) {
    /**/
  }

  private convertToCandle(response: Array<Array<number>>): Array<Candle> {
    const returnValue: Array<Candle> = [];
    for (const candle of response) {
      if (candle.length === 6) {
        returnValue.push(new Candle(candle));
      }
    }

    return returnValue;
  }

  /*
    endpoint: GET /products/<product id>/candles
    params:
      * start:       Start time in ISO 8601
      * end:         End time in ISO 8601
      * granularity: Desired timeslice in seconds

    max number of candles is 200 (per request)

    response: [
      time:   <start time>,
      low:    <low price>,
      high:   <high price>,
      open:   <open price>,
      close:  <close price>,
      volume: <volume for single slice>
    ]
  */
  getHistoricRates(productId: string, start: string, end: string, granularity: number): Observable<Array<Candle>> {
    const endpoint: string = server + '/products/' + productId + '/candles';
    const params: URLSearchParams = new URLSearchParams();
    params.set('start', start);
    params.set('end', end);
    params.set('granularity', granularity.toString());

    const requestOptions: RequestOptionsArgs = {
      url: endpoint,
      params: params
    };

    return new Observable((obs) => {
      this.http.get(endpoint, requestOptions).subscribe((response: Response) => {
        if (response && response.json) {
          obs.next(this.convertToCandle(response.json()));
        } else {
          obs.next([]);
        }
        obs.complete();
      });
    });
  }

  getHistory(productId: string, granularity: number): Observable<Array<Candle>> {
    const d: Date = new Date();
    const end: string = d.toISOString();
    const start: string = (new Date(((d.valueOf() / 1000) - (200 * granularity)) * 1000)).toISOString();
    console.log(start);
    console.log(end);

    return this.getHistoricRates(productId, start, end, granularity);
  }

  getEthHistory(granularity: number): Observable<Array<Candle>> {
    return this.getHistory('ETH-USD', granularity);
  }

  getBtcHistory(granularity: number): Observable<Array<Candle>> {
    return this.getHistory('ETH-USD', granularity);
  }
}
