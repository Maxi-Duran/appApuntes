import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(private firestore: FirestoreService, private router: Router) {}
  users: any = {};
  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this.firestore.getUser().subscribe((user) => {
      if (user) {
        this.firestore.getName().subscribe((res) => {
          this.users = res;
          console.log(res);
        });
      }
    });
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const uid = this.firestore.getUserId();

    if (file && uid) {
      try {
        await this.firestore.uploadImage(file, uid);
        console.log('Imagen de perfil actualizada correctamente.');
      } catch (error) {
        console.error('Error actualizando la imagen de perfil:', error);
      }
    } else {
      console.error(
        'No se ha seleccionado un archivo o no se ha encontrado el UID.'
      );
    }
  }
}
