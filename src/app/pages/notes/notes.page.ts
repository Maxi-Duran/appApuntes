import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
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
