import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastController } from '@ionic/angular';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
  providers: [MessageService],
})
export class LoginEmailPage implements OnInit {
  data: any = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    public toastController: ToastController,
    private fireService: FirestoreService,
    private messageService: MessageService
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
          this.loading = false;
          this.showSuccess();
        },
        (err) => {
          this.loading = false;
          this.showError();
        }
      );
  }

  signup() {
    this.router.navigateByUrl('signup');
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Cuenta Creada',
      detail: 'Inicio de sesion exitoso',
      life: 3000,
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Hubo un problema al iniciar sesion',
      life: 3000,
    });
  }
}
