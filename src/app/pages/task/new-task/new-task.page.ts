import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/interfaces/diccionario';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  disableSelect = new FormControl(false);
  task: any = {
    name: '',
    asignatura: '',
  };
  constructor(private firestore: FirestoreService) {}

  ngOnInit() {}

  createTask() {
    console.log('agrengado');
    const data = {
      name: this.task.name,
      completed: false,
      asignatura: this.task.asignatura,
    };
    const path = 'Tasks/';
    const id = '01';
    this.firestore.createTask(data, path, id);
  }
}
