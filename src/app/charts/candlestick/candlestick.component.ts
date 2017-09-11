// angular imports
import { Component, OnInit } from '@angular/core';

// primeng imports
import { SelectItem } from 'primeng/primeng';

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
  timeIntervals: Array<SelectItem>;
  selectedInterval: number;

  constructor(
    private gdax: GDAX
  ) {
    this.timeIntervals = [
      {label: '1m', value: 60},
      {label: '15m', value: 15 * 60},
      {label: '1h', value: 60 * 60},
      {label: '6h', value: 6 * 60 * 60},
      {label: '1d', value: 24 * 60 * 60},
      {label: '1w', value: 7 * 24 * 60 * 60}
    ]
  }

  ngOnInit() {
    this.plot(60);
  }

  intervalChange(e: any) {
    this.plot(e.value);
  }

  plot(granularity: number) {
    this.gdax.getEthHistory(granularity).subscribe((data) => {
      const x:     Array<string> = [];
      const close: Array<number> = [];
      const high:  Array<number> = [];
      const low:   Array<number> = [];
      const open:  Array<number> = [];
      const y:     Array<number> = [];

      for (const entry of data) {
        x.push((new Date(entry.time * 1000).toISOString()));
        close.push(entry.close);
        high.push(entry.high);
        low.push(entry.low);
        open.push(entry.open);
        y.push(entry.volume);
      }

      const drawData = [{
        x: x,
        y: y,
        type: 'bar',
        xaxis: 'x',
        yaxis: 'y'
      }, {
        x: x,
        close: close,
        high: high,
        low: low,
        open: open,
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y2',
        decreasing: {line: {color: '#E74C3C'}},
        increasing: {line: {color: '#2ECC71'}},
        line: {color: '606060'}
      }];

      const layout = {
        dragmode: 'zoom',
        margin: {
          r: 10,
          t: 25,
          b: 10,
          l: 60
        },
        showlegend: false,
        yaxis: {
          autorange: true,
          type: 'linear',
          title: 'Volume',
          domain: [0, .25]
        },
        yaxis2: {
          autorange: true,
          type: 'linear',
          title: 'Price',
          domain: [.25, 1],
          anchor: 'y2'
        },
        xaxis: {
          autorange: true,
          title: 'Date',
          type: 'date'
        },
      }
      Plotly.newPlot('plotly-div', drawData, layout);
    });
  }
}
