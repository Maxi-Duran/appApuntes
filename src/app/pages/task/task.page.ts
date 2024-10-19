import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  tasks: any[] = [];
  constructor(private firestore: FirestoreService, private router: Router) {}

  ngOnInit() {
    this.getTasks();
  }
  updateTask(taskId: string, currentStatus: boolean) {
    const newStatus = !currentStatus;
    const data = {
      completed: newStatus,
    };
    this.firestore.updateTask(taskId, data);
  }

  getTasks() {
    this.firestore.getTask().subscribe((res) => {
      this.tasks = res; // Guardar las tareas en la variable
      console.log(this.tasks);
      console.log('hola');
    });
  }

  deleteTask(id: string) {
    console.log('eliminando');
    this.firestore.deleteTask(id).then(() => {
      console.log('eliminado');
      this.getTasks();
    });
  }
  navigateToUpdateTask(id: string) {
    this.router.navigate(['/update-task', id]);
    console.log('navegando');
  }
}
