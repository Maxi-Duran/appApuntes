import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;

  chart: any;

  constructor() {}

  ngAfterViewInit() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: '',
            data: [20, 59, 80, 81],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
