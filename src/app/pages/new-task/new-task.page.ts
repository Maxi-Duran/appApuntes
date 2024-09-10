import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  data: any[] = [
    {
      id: 1,
      task: 'Programacion Web',
      date: '22/3/23',
    },
    {
      id: 2,
      task: 'Programacion de Algoritmos',
      date: '22/3/23',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
