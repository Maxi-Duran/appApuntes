import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-home-2',
  templateUrl: './home-2.page.html',
  styleUrls: ['./home-2.page.scss'],
})
export class Home2Page implements OnInit {
  isModalOpen = false;
  tasks: any[] = [];
  completedTasks: any[] = [];
  pendingTasks: any[] = [];
  expTasks: any[] = [];

  openMenu() {
    this.menuCtrl.open('end');
  }
  getTasks() {
    this.firestore.getTask().subscribe((res) => {
      this.tasks = res;
      console.log(this.tasks);
      console.log('hola');
      this.filterTasks();
    });
  }
  //filtramos tareas que tienen fecha limite de 3 dias al dia actual
  filterTasks() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.completedTasks = this.tasks.filter((task) => task.completed);
    this.pendingTasks = this.tasks.filter((task) => !task.completed);

    this.expTasks = this.tasks.filter((task) => {
      if (task.endDate) {
        const taskDate = new Date(
          task.endDate.seconds * 1000 +
            Math.floor(task.endDate.nanoseconds / 1000000)
        ); // convertir a milisegundos
        taskDate.setHours(0, 0, 0, 0);

        const diffDays =
          (taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 5;
      }
      return false;
    });

    console.log(this.expTasks);
  }
  convertTimestampToDate(timestamp: any): Date | null {
    if (timestamp) {
      return new Date(
        timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
      );
    }
    return null;
  }

  constructor(
    private firestore: FirestoreService,
    private menuCtrl: MenuController,
    private router: Router,
    private toastController: ToastController
  ) {}
  errorMessage = '';
  users: any = {};
  ngOnInit() {
    this.getName();
    this.getTasks();
  }
  getName() {
    this.firestore.getUser().subscribe((user) => {
      if (user) {
        this.firestore.getName().subscribe((res) => {
          this.users = res;
          console.log(res);
        });
      } else {
        console.log('Usuario no autenticado, no se puede obtener el nombre');
      }
    });
  }

  logoutUser() {
    this.firestore
      .Logout()
      .then(() => {
        console.log('Usuario cerrado sesión');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  //cambiar imagen
  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const uid = this.firestore.getUserId();

    if (file && uid) {
      try {
        await this.firestore.uploadImage(file, uid);
        this.errorMessage = 'Imagen Actualizada';
        this.presentToast('top', this.errorMessage, 3000, 'success');
        console.log('Imagen de perfil actualizada correctamente.');
      } catch (error) {
        this.errorMessage = 'Error al actualizar imagen';
        this.presentToast('top', this.errorMessage, 3000, 'error');
        console.error('Error actualizando la imagen de perfil:', error);
      }
    } else {
      console.error(
        'No se ha seleccionado un archivo o no se ha encontrado el UID.'
      );
    }
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
