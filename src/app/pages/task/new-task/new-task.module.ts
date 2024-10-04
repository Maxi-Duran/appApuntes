import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { IonicModule } from '@ionic/angular';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NewTaskPageRoutingModule } from './new-task-routing.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NewTaskPage } from './new-task.page';

@NgModule({
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,

    MatMenuModule,
    CommonModule,

    IonicModule,
    NewTaskPageRoutingModule,

    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,

    MatButtonModule,
    MatIconModule,
  ],
  declarations: [NewTaskPage],
})
export class NewTaskPageModule {}
