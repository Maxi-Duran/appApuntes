import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register: any = {
    user: '',
    email: '',
    password: '',
    repeatpassword: '',
  };
  errorMessage: string = '';

  constructor(public router: Router, public toastController: ToastController) {}
  showPassword: boolean = false;
  onChangeVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit() {}

  onSubmit() {
    let navigationExtras: NavigationExtras = {
      state: { user: this.register.user },
    };

    //validacion de espacio en blanco
    if (
      this.register.password == '' ||
      this.register.repeatpassword == '' ||
      this.register.user == '' ||
      this.register.email == ''
    ) {
      this.errorMessage = 'Complete todos los campos';
      this.presentToast('bottom', this.errorMessage, 3000, 'danger');

      return;
    }
    //validacion de user
    if (this.register.user.length < 4) {
      this.errorMessage = 'Nombre incorrecto';
      this.presentToast('bottom', this.errorMessage, 3000, 'danger');

      return;
    }
    //validacion de contraseña
    if (this.register.password.length < 8) {
      this.errorMessage = 'Contraseña incorrecta';
      this.presentToast('bottom', this.errorMessage, 3000, 'danger');

      return;
    }
    //validacion de coincidencia de contraseña
    if (this.register.repeatpassword != this.register.password) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.presentToast('bottom', this.errorMessage, 3000, 'danger');

      return;
    }

    this.router.navigate(['/login'], navigationExtras);
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
