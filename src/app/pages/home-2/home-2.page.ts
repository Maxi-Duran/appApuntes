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

  openMenu() {
    this.menuCtrl.open('end'); // 'end' abre el menú en el lado derecho
  }
  data: any[] = [
    {
      id: 1,
      task: 'Estudiar',
      date: '22/3/23',
    },
    {
      id: 2,
      task: 'Estudiar',
      date: '22/3/23',
    },
    {
      id: 3,
      task: 'Estudiar',
      date: '22/3/23',
    },
    {
      id: 1,
      task: 'Estudiar',
      date: '22/3/23',
    },
    {
      id: 1,
      task: 'Estudiar',
      date: '22/3/23',
    },
    {
      id: 1,
      task: 'Estudiar',
      date: '22/3/23',
    },
    {
      id: 1,
      task: 'Estudiar',
      date: '22/3/23',
    },
    {
      id: 1,
      task: 'Estudiar',
      date: '22/3/23',
    },
    {
      id: 1,
      task: 'Estudiar',
      date: '22/3/23',
    },

    {
      id: 1,
      task: 'Estudiar',
      date: '22/3/23',
    },
    {
      id: 1,
      task: 'Estudiar',
      date: '22/3/23',
    },
  ];
  constructor(
    private firestore: FirestoreService,
    private menuCtrl: MenuController,
    private router: Router
  ) {}
  users: any = {};
  ngOnInit() {
    this.getName();
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
