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
import { SpeedDialModule } from 'primeng/speeddial';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
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
    SpeedDialModule,
    AvatarGroupModule,
    AvatarModule,
  ],
  declarations: [FriendsPage],
})
export class FriendsPageModule {}
