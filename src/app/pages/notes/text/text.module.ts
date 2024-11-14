import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapTypeH1,
  bootstrapTypeH2,
  bootstrapTypeH3,
} from '@ng-icons/bootstrap-icons';
import { radixFontBold, radixFontItalic } from '@ng-icons/radix-icons';
import { IonicModule } from '@ionic/angular';

import { TextPageRoutingModule } from './text-routing.module';

import { TextPage } from './text.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextPageRoutingModule,
    NgIconsModule.withIcons({
      bootstrapTypeH1,
      bootstrapTypeH2,
      bootstrapTypeH3,
      radixFontBold,
      radixFontItalic,
    }),
  ],
  declarations: [TextPage],
})
export class TextPageModule {}
