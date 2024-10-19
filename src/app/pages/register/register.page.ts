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

  showPassword: boolean = false;
  onChangeVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit() {}
  signup() {
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
              alert('Account Created!');
            })
            .catch((err) => {
              console.error('Error saving user details:', err);
            });
        } else {
          console.error('Error: User object is null or undefined', res);
          alert('Error creating account. Please try again.');
        }
      })
      .catch((err) => {
        console.error('Error during signup:', err);
        alert(
          'Error creating account. Please check your details and try again.'
        );
      });
  }

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

    this.router.navigate(['/welcome'], navigationExtras);
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
