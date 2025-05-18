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
    private afAuth: AngularFireAuth, // Folosim acest serviciu ca să verificăm dacă userul este logat
    private router: Router // Pentru a redirecționa către pagina potrivită
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Această funcție rulează când aplicația este gata

      // Ne abonăm la starea de autentificare (se emite ori de câte ori se schimbă)
       this.afAuth.authState.subscribe(user => {
      // De exemplu, poți salva userul într-un serviciu sau variabilă locală
      // Dar nu mai face router.navigate aici!
      console.log('User logged in:', user);
      });
    });
  }
}
