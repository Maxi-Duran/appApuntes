import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  task: any = {
    name: '',
    asignatura: '',
    endDate: '',
  };

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la tarea
    if (taskId) {
      this.getTask(taskId);
    }
  }

  getTask(id: string) {
    this.firestore.getTaskById(id).subscribe((task) => {
      this.task = task; // Cargar los datos de la tarea
    });
  }

  updateTask() {
    const data = {
      name: this.task.name,
      asignatura: this.task.asignatura,
      endDate: this.task.endDate,
    };
    this.firestore.updateTask(this.task.id, data).then(() => {
      console.log('Tarea actualizada');
    });
  }
}
