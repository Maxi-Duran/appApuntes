import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NotesPageRoutingModule } from './notes-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { NotesPage } from './notes.page';
import { ListboxModule } from 'primeng/listbox';
@NgModule({
  imports: [
    RouterModule,
    MatCardModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    IonicModule,
    NotesPageRoutingModule,
    ListboxModule,
  ],
  declarations: [NotesPage],
})
export class NotesPageModule {}
