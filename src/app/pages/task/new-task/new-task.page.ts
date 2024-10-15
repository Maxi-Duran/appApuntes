import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    endDate: '',
  };
  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {}

  createTask() {
    console.log('agregando');
    const id = this.firestore.createId(); // Genera un ID único automáticamente
    const data = {
      id: id,
      name: this.task.name,
      completed: false,
      asignatura: this.task.asignatura,
      endDate: this.task.endDate, // Usa la fecha seleccionada
    };
    const path = 'Tasks/';

    this.firestore
      .collection(path)
      .doc(id)
      .set(data)
      .then(() => {
        console.log('Tarea creada con ID:', id);
      })
      .catch((error) => {
        console.error('Error al crear la tarea:', error);
      });
  }
}
