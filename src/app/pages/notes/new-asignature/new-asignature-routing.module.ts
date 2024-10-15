import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAsignaturePage } from './new-asignature.page';

const routes: Routes = [
  {
    path: '',
    component: NewAsignaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAsignaturePageRoutingModule {}
