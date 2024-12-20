import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CalendarPage } from './calendar.page';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,

    CalendarModule,
    SharedModule,
  ],

  declarations: [CalendarPage],
})
export class CalendarPageModule {}
