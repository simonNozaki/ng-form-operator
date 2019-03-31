import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { GraphControl } from '../../entity/graph-control';

/**
 * 表描画コンポーネント
 */
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  
    /**
     * デフォルトコンストラクタ
     */
    constructor(private _elementRef: ElementRef) { 
        this.ref = _elementRef.nativeElement;
    }
    
    @ViewChild('taskgraph')
    public ref: HTMLElement;

    public context: CanvasRenderingContext2D;
    
    public chart: Chart;
    
    ngOnInit() {
    }
    
    ngAfterViewInit(): void {
        setTimeout(() => {
            // チャートの作成
            this.chart = new Chart('taskgraph', {
              type: 'horizontalBar',
              data: {
                  labels: ['Red', 'Blue'],
                  datasets: [{
                      label: '# of Votes',
                      data: [
                          {
                              x: new Date('2019-03-31T00:00:00'),
                              y: 'Red'
                          },
                          {
                              x: new Date('2019-01-01T00:00:00'),
                              y: 'Blue'
                          }
                      ],
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      xAxes: [
                        {
                          type: 'time',
                          time: {
                            displayFormats: {
                              week: 'll'
                            },
                            unit: 'day',
                            minUnit: 'day'
                          },
                          distribution: 'linear',
                          bounds: 'data',
                        }
                      ],
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
            });            
        }, 500)
    }
}
