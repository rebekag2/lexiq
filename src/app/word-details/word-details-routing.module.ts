import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordDetailsPage } from './word-details.page';

const routes: Routes = [
  {
    path: '',
    component: WordDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordDetailsPageRoutingModule {}
