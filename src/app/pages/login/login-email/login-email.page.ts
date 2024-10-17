import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

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

  constructor(private router: Router, private fireService: FirestoreService) {}
  showPassword: boolean = false;
  onChangeVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit() {}

  login() {
    this.fireService
      .loginWithEmail({ email: this.data.email, password: this.data.password })
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          alert(err.message);
          console.log(err);
        }
      );
  }

  signup() {
    this.router.navigateByUrl('signup');
  }
}
