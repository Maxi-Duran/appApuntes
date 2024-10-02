import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Home2PageRoutingModule } from './home-2-routing.module';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { Home2Page } from './home-2.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, Home2PageRoutingModule],
  declarations: [Home2Page, ChartComponent],
})
export class Home2PageModule {}
