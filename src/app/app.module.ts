import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatDatepickerModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
