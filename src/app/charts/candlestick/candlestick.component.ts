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
      const x:     Array<string> = [];
      const close: Array<number> = [];
      const high:  Array<number> = [];
      const low:   Array<number> = [];
      const open:  Array<number> = [];

      for (const entry of data) {
        x.push((new Date(entry.time * 1000).toISOString()));
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
        showlegend: false,
        xaxis: {
          autorange: true,
          domain: [0, 1],
          rangeslider: {range: [x[0], x[x.length - 1]]},
          title: 'Date',
          type: 'date'
        },
        yaxis: {
          autorange: true,
          domain: [0, 1],
          range: [Math.min(...low), Math.max(...high)],
          type: 'linear'
        }
      }
      Plotly.plot('plotly-div', drawData, layout);
    });

  }
}
