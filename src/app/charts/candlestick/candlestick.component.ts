// angular imports
import { Component, OnInit } from '@angular/core';

// local imports
import { GDAX } from '../../gdax/gdax.service';

declare var Plotly: any;

@Component({
  selector: 'app-candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.css'],
  providers: [GDAX]
})
export class CandlestickComponent implements OnInit {
  constructor(
    private gdax: GDAX
  ) {
    /**/
  }

  ngOnInit() {
    this.gdax.getEthHistory(15 * 60).subscribe((data) => {
      const x:     Array<number> = [];
      const close: Array<number> = [];
      const high:  Array<number> = [];
      const low:   Array<number> = [];
      const open:  Array<number> = [];

      for (const entry of data) {
        x.push(entry.time);
        close.push(entry.close);
        high.push(entry.high);
        low.push(entry.low);
        open.push(entry.open);
      }

      const drawData = [{
        x: x,
        close: close,
        high: high,
        low: low,
        open: open,
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y',
        decreasing: {line: {color: '#E74C3C'}},
        increasing: {line: {color: '#2ECC71'}},
        line: {color: '606060'}
      }];

      const layout = {
        dragmode: 'zoom',
        margin: {
          r: 10,
          t: 25,
          b: 40,
          l: 60
        },
        showlegend: false/*,
        xaxis: {
          autorange: true,
          domain: [0, 1],
          range: ['2017-01-03 12:00', '2017-02-15 12:00'],
          rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']},
          title: 'Date',
          type: 'date'
        },
        yaxis: {
          autorange: true,
          domain: [0, 1],
          range: [114.609999778, 137.410004222],
          type: 'linear'
        }
        */
      }
      Plotly.plot('plotly-div', drawData, layout);
    });

  }
}
