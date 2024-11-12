// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';

import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  declarations: [NavComponent],
  exports: [NavComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    IonicModule.forRoot(),
    MatIconModule,
    FileUploadModule,
    ButtonModule,
    AvatarGroupModule,
    AvatarModule,
    RouterModule,
  ],
})
export class SharedModule {}
