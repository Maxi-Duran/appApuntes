import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { IonicModule } from '@ionic/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    MatProgressSpinnerModule,
    ToastModule,
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
