// angular imports
import { Component, OnInit } from '@angular/core';

// primeng imports
import { SelectItem } from 'primeng/primeng';

// local imports
import { GDAX } from '../../gdax/gdax.service';

declare var Plotly: any;

@Component({
  selector: 'app-depth-chart',
  templateUrl: './depth-chart.component.html',
  styleUrls: ['./depth-chart.component.css'],
  providers: [GDAX]
})
export class DepthChartComponent implements OnInit {
  timeIntervals: Array<SelectItem>;
  selectedInterval: number;

  constructor(
    private gdax: GDAX
  ) {
    /* */
  }

  ngOnInit() {
    this.plot();
  }

  plot() {
    this.gdax.getEthDepth(true).subscribe((data) => {
      const bidsX = [];
      const bidsY = [];
      let bidsSum = 0;

      for (const bid of data.bids.slice(0, 1000)) {
        bidsSum += parseInt(bid[1], 10);
        bidsX.push(parseInt(bid[0], 10));
        bidsY.push(bidsSum);
      }

      const asksX = [];
      const asksY = [];
      let asksSum = 0;

      for (const ask of data.asks.slice(0, 1000)) {
        asksSum += parseInt(ask[1], 10);
        asksX.push(parseInt(ask[0], 10));
        asksY.push(asksSum);
      }

      const drawData = [{
        x: bidsX,
        y: bidsY,
        type: 'bar',
        xaxis: 'x',
        yaxis: 'y',
        width: 1,
        marker: {
          color: '#E74C3C'
        }
      }, {
        x: asksX,
        y: asksY,
        type: 'bar',
        xaxis: 'x',
        yaxis: 'y',
        width: 1,
        marker: {
          color: '#2ECC71'
        }
      }];

      const layout = {
        dragmode: 'zoom',
        margin: {
          r: 10,
          t: 25,
          b: 60,
          l: 60
        },
        showlegend: false,
        yaxis: {
          autorange: true,
          type: 'linear',
          title: 'Volume',
        },
        xaxis: {
          autorange: true,
          title: 'Price',
          type: 'linear'
        },
      }
      Plotly.newPlot('depth-chart', drawData, layout);
    });
  }
}
