import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

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
    image: '',
  };
  errorMessage: string = '';

  constructor(
    public router: Router,
    public toastController: ToastController,
    private fireservice: FirestoreService
  ) {}
  loading: boolean = false;

  showPassword: boolean = false;
  onChangeVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit() {}
  onSubmit() {
    this.loading = true;

    this.fireservice
      .signup({ email: this.register.email, password: this.register.password })
      .then((res) => {
        if (res && res.user && res.user.uid) {
          let data = {
            email: this.register.email,
            password: this.register.password,
            name: this.register.user,
            uid: res.user.uid,
            image: this.register.image,
          };

          this.fireservice
            .saveDetails(data)
            .then(() => {
              this.loading = false;
              this.errorMessage = 'Cuenta Creada!';
              this.presentToast('top', this.errorMessage, 3000, 'success');
              this.router.navigate(['/welcome']);
            })
            .catch((err) => {
              this.loading = false;
              this.errorMessage = 'Error al crear la cuenta';
              this.presentToast('bottom', this.errorMessage, 3000, 'danger');
            });
        } else {
          this.loading = false;
          console.error('Error: User object is null or undefined', res);
          this.errorMessage = 'Error al crear la cuenta';
          this.presentToast('bottom', this.errorMessage, 3000, 'danger');
        }
      })
      .catch((err) => {
        this.loading = false;
        console.error('Error during signup:', err);
        this.errorMessage = 'Error al crear la cuenta';
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
