import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginEmailPageRoutingModule } from './login-email-routing.module';

import { LoginEmailPage } from './login-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginEmailPageRoutingModule,
    MatProgressSpinnerModule,
  ],
  declarations: [LoginEmailPage],
})
export class LoginEmailPageModule {}
