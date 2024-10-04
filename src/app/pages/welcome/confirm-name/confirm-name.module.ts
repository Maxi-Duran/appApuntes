import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmNamePageRoutingModule } from './confirm-name-routing.module';

import { ConfirmNamePage } from './confirm-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmNamePageRoutingModule
  ],
  declarations: [ConfirmNamePage]
})
export class ConfirmNamePageModule {}
