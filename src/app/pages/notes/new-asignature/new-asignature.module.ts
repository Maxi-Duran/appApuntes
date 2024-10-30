import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatInputModule } from '@angular/material/input';

import { NewAsignaturePageRoutingModule } from './new-asignature-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewAsignaturePage } from './new-asignature.page';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAsignaturePageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  declarations: [NewAsignaturePage],
})
export class NewAsignaturePageModule {}
