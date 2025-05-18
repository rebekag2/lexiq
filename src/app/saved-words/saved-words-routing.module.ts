import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedWordsPage } from './saved-words.page';

const routes: Routes = [
  {
    path: '',
    component: SavedWordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedWordsPageRoutingModule {}
