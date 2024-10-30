import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  tasks: any[] = [];
  errorMessage: string = '';
  constructor(
    private firestore: FirestoreService,
    private router: Router,
    private toastController: ToastController
  ) {}
  loading: boolean = false;
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
    this.loading = true;
    this.firestore.getTask().subscribe((res) => {
      this.tasks = res; // Guardar las tareas en la variable
      console.log(this.tasks);
      this.loading = false;
      console.log('hola');
    });
  }

  deleteTask(id: string) {
    console.log('eliminando');
    this.firestore.deleteTask(id).then(() => {
      this.errorMessage = 'Eliminado';
      this.presentToast('top', this.errorMessage, 3000, 'success');

      this.getTasks();
    });
  }
  navigateToUpdateTask(id: string) {
    this.router.navigate(['/update-task', id]);
    console.log('navegando');
  }
  async presentToast(
    position: 'top' | 'middle' | 'bottom',
    msg: string,
    duration?: number,
    color?: string
  ) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2500,
      position: position,
      color: color,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }
}
