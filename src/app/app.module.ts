import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat'; //conecteaza aplicatia cu Firebase
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; //permite autentificarea cu Firebase
import { environment } from '../environments/environment'; 
import { HttpClientModule } from '@angular/common/http'; //permite trimiterea de cereri http catre servere externe cum ar fi WordsAPI


@NgModule({
  declarations: [AppComponent],
  //module externe de care apicatia are nevoie
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule 
  ],
  //suprascriem comportamentul implicit al navigarii folosind strategia de routare oferita de Ionic
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }], 
  bootstrap: [AppComponent],
})
export class AppModule {
}
