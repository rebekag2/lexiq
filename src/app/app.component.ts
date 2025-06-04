import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private afAuth: AngularFireAuth, // Folosim acest serviciu ca să verificam daca userul este logat
    private router: Router // Pentru a redirectiona catre pagina potrivita
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

       this.afAuth.authState.subscribe(user => {

      console.log('User logged in:', user);
      });
    });
  }
}
