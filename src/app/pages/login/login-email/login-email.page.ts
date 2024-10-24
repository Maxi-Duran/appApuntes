import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})
export class LoginEmailPage implements OnInit {
  data: any = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    public toastController: ToastController,
    private fireService: FirestoreService
  ) {}
  showPassword: boolean = false;
  onChangeVisibility() {
    this.showPassword = !this.showPassword;
  }
  errorMessage: string = '';
  loading: boolean = false;
  ngOnInit() {}

  login() {
    this.loading = true;
    this.fireService
      .loginWithEmail({ email: this.data.email, password: this.data.password })
      .then(
        (res) => {
          console.log(res);
          this.loading = false;
          this.errorMessage = 'Inicio de sesion Exitoso';
          this.presentToast('top', this.errorMessage, 3000, 'success');
        },
        (err) => {
          this.loading = false;
          this.errorMessage = 'Error al iniciar Sesion';
          this.presentToast('bottom', this.errorMessage, 3000, 'danger');
        }
      );
  }

  signup() {
    this.router.navigateByUrl('signup');
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
