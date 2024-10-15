import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateTaskPageRoutingModule } from './update-task-routing.module';

import { UpdateTaskPage } from './update-task.page';

import { MatMenuModule } from '@angular/material/menu';

import { MatSelectModule } from '@angular/material/select';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    MatCheckboxModule,
    FormsModule,
    UpdateTaskPageRoutingModule,
    MatSelectModule,

    MatMenuModule,
    CommonModule,

    IonicModule,

    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,

    MatButtonModule,
    MatIconModule,
  ],
  declarations: [UpdateTaskPage],
})
export class UpdateTaskPageModule {}
