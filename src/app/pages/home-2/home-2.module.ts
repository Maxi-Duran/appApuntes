import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { Home2PageRoutingModule } from './home-2-routing.module';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { Home2Page } from './home-2.page';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Home2PageRoutingModule,
    MatIconModule,
    MatSlideToggleModule,
    FileUploadModule,
  ],
  declarations: [Home2Page, ChartComponent],
})
export class Home2PageModule {}
