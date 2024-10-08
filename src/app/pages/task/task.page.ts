import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  constructor(private firestore: FirestoreService) {}
  tasks: any[] = [];

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.firestore.getTask().subscribe((res) => {
      this.tasks = res; // Guardar las tareas en la variable
      console.log(this.tasks); // Solo para verificar en la consola
    });
  }
}
