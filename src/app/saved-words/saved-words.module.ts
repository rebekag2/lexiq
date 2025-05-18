import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedWordsPageRoutingModule } from './saved-words-routing.module';

import { SavedWordsPage } from './saved-words.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedWordsPageRoutingModule
  ],
  declarations: [SavedWordsPage]
})
export class SavedWordsPageModule {}
