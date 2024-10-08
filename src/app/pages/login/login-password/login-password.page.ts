import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.page.html',
  styleUrls: ['./login-password.page.scss'],
})
export class LoginPasswordPage implements OnInit {
  constructor() {}
  showPassword: boolean = false;
  onChangeVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {}
}
