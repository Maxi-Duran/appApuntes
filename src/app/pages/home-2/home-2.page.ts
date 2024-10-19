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
    this.completedTasks = this.tasks.filter((task) => task.completed);
    this.pendingTasks = this.tasks.filter((task) => !task.completed);
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
