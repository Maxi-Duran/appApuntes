import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { TaskPageRoutingModule } from './task-routing.module';
import { OrderListModule } from 'primeng/orderlist';
import { TaskPage } from './task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    TaskPageRoutingModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    OrderListModule,
  ],
  declarations: [TaskPage],
})
export class TaskPageModule {}
