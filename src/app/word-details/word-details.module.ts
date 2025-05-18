import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordDetailsPageRoutingModule } from './word-details-routing.module';

import { WordDetailsPage } from './word-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordDetailsPageRoutingModule
  ],
  declarations: [WordDetailsPage]
})
export class WordDetailsPageModule {}
