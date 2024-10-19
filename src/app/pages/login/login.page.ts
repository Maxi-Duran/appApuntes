import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: 'Login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private firestore: FirestoreService,
    private router: Router,
    private toastController: ToastController
  ) {}
  errorMessage: string = '';
  loading: boolean = false;
  ngOnInit() {}

  loginWithGoogle() {
    this.loading = true;
    this.firestore
      .loginWithGoogle()
      .then((res) => {
        this.loading = false;
        this.errorMessage = 'Inicio de sesion Exitoso';
        this.presentToast('top', this.errorMessage, 3000, 'success');
        this.router.navigate(['/welcome']);
      })
      .catch((error) => {
        this.loading = false;
        this.errorMessage = 'Error al iniciar Sesion';
        this.presentToast('bottom', this.errorMessage, 3000, 'danger');
      });
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
