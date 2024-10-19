import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  notes: any[] = [];
  disableSelect = new FormControl(false);
  task: any = {
    name: '',
    asignatura: '',
    endDate: '',
  };
  constructor(
    private firestore: AngularFirestore,
    private firestoreget: FirestoreService
  ) {}

  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.firestoreget.getNotes().subscribe((res) => {
      this.notes = res; // Guardar las tareas en la variable
      console.log(this.notes);
    });
  }

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

    this.firestoreget.createTask(data, id).then(() => {
      console.log('Tarea creada con éxito');
      // Aquí puedes agregar lógica adicional, como limpiar el formulario
    });
  }
}
