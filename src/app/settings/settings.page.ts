import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage {

 constructor(
    private afAuth: AngularFireAuth, // pentru autentificare
    private router: Router // pentru a redirecționa utilizatorul
  ) {}

  // Funcția care deloghează utilizatorul
  logout() {
    this.afAuth.signOut().then(() => {
      // după ce se deloghează cu succes, îl redirecționăm la pagina de login
      this.router.navigate(['/login']);
    });
  }
}
