import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  tasks: any[] = []; // Arreglo para almacenar las tareas

  constructor(private firestore: FirestoreService, private router: Router) {}

  ngOnInit() {
    this.getTasks(); // Obtener las tareas al iniciar el componente
  }

  // Método para navegar a la página de actualización de tarea
  navigateToUpdateTask(id: string) {
    this.router.navigate(['/update-task', id]);
    console.log('aa'); // Navegar a la página de actualización con el ID de la tarea
  }

  // Método para obtener las tareas
  getTasks() {
    this.firestore.getTask().subscribe((res) => {
      this.tasks = res; // Guardar las tareas en la variable
      console.log(this.tasks);
    });
  }

  // Método para eliminar una tarea
  deleteTask(id: string) {
    this.firestore.deleteTask(id).then(() => {
      console.log('eliminado', id);
      this.getTasks(); // Volver a obtener las tareas después de eliminar
    });
  }
}
