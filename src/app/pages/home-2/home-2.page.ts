import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
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
  filterTasks() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a medianoche

    this.completedTasks = this.tasks.filter((task) => task.completed);
    this.pendingTasks = this.tasks.filter((task) => !task.completed);

    this.expTasks = this.tasks.filter((task) => {
      if (task.endDate) {
        // Convertir el endDate (Timestamp) a un objeto Date
        const taskDate = new Date(
          task.endDate.seconds * 1000 +
            Math.floor(task.endDate.nanoseconds / 1000000)
        ); // Convertir a milisegundos
        taskDate.setHours(0, 0, 0, 0); // Establecer la hora a medianoche

        const diffDays =
          (taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 5; // Tareas con una fecha de finalización dentro de 5 días
      }
      return false;
    });

    console.log(this.expTasks); // Para verificar el resultado
  }
  convertTimestampToDate(timestamp: any): Date | null {
    if (timestamp) {
      return new Date(
        timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
      );
    }
    return null; // Retorna null si no hay un timestamp
  }

  constructor(
    private firestore: FirestoreService,
    private menuCtrl: MenuController,
    private router: Router
  ) {}
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
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
