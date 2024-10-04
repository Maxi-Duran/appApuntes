import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmNamePage } from './confirm-name.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmNamePageRoutingModule {}
