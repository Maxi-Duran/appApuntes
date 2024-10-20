import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  loading: boolean = false;
  errorMessage: string = '';
  constructor(
    private router: Router,
    public toastController: ToastController,
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
    this.loading = true;
    const data = {
      name: this.task.name,
      asignatura: this.task.asignatura,
      endDate: this.task.endDate,
    };
    this.firestore.updateTask(this.task.id, data);
    this.loading = false;
    this.errorMessage = 'Actualizacion completa';
    this.presentToast('top', this.errorMessage, 3000, 'success');
    this.router.navigate(['/task']);

    console.log('actualizando');
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
