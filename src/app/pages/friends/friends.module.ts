import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsPageRoutingModule } from './friends-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FriendsPage } from './friends.page';
import { ChipModule } from 'primeng/chip';
import { OrderListModule } from 'primeng/orderlist';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsPageRoutingModule,
    SharedModule,
    ChipModule,
    OrderListModule,
    MenubarModule,
  ],
  declarations: [FriendsPage],
})
export class FriendsPageModule {}
