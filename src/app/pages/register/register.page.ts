import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [MessageService],
})
export class RegisterPage implements OnInit {
  register: any = {
    user: '',
    email: '',
    password: '',
    repeatpassword: '',
    profileImageUrl: '',
  };

  constructor(
    public router: Router,
    private messageService: MessageService,
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
            profileImageUrl: this.register.profileImageUrl,
          };

          this.fireservice
            .saveDetails(data)
            .then(() => {
              this.loading = false;

              this.showSuccess();
              this.router.navigate(['/welcome']);
            })
            .catch((err) => {
              this.loading = false;

              this.showError();
            });
        } else {
          this.loading = false;
          console.error('Error: User object is null or undefined', res);

          this.showError();
        }
      })
      .catch((err) => {
        this.loading = false;
        console.error('Error during signup:', err);

        this.showError();
      });
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Cuenta Creada',
      detail: 'Tu cuenta se ha creado exitosamente',
      life: 3000,
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Hubo un problema al crear la cuenta',
      life: 3000,
    });
  }
}
