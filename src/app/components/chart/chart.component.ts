import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;

  chart: any;
  tasks: any[] = [];

  constructor(public firestore: FirestoreService) {}

  getTasks() {
    this.firestore.getTask().subscribe((res) => {
      this.tasks = res;
      this.updateChartData();
    });
  }

  updateChartData() {
    const now = new Date();
    const labels: string[] = [];
    const taskCounts: number[] = [0, 0, 0, 0];

    for (let i = 3; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i);
      const monthName = date.toLocaleString('default', { month: 'long' });
      labels.push(monthName);
    }

    this.tasks.forEach((task) => {
      if (task.endDate) {
        let endDate: Date;

        if (task.endDate.seconds) {
          endDate = new Date(task.endDate.seconds * 1000);
        } else {
          endDate = new Date(task.endDate);
        }

        const diffMonths =
          now.getMonth() -
          endDate.getMonth() +
          12 * (now.getFullYear() - endDate.getFullYear());
        if (diffMonths >= 0 && diffMonths < 4) {
          taskCounts[3 - diffMonths]++;
        }
      }
    });

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = taskCounts;
    this.chart.update();
  }

  ngAfterViewInit() {
    const now = new Date();
    const labels: string[] = [];

    for (let i = 3; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i);
      const monthName = date.toLocaleString('default', { month: 'long' });
      labels.push(monthName);
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: `Tareas Asignadas en los últimos meses`,
            data: [0, 0, 0, 0],
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    this.getTasks();
  }
}
