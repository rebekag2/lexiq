import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage  implements OnInit {

    selectedDifficulty: 'low' | 'medium' | 'high' = 'medium'; // default

 constructor(
    private afAuth: AngularFireAuth, // pentru autentificare
    private router: Router // pentru a redirecționa utilizatorul 
  ) {}
  
  ngOnInit(): void {
    const saved = localStorage.getItem('difficulty');
      if (saved === 'low' || saved === 'medium' || saved === 'high') {
        this.selectedDifficulty = saved;
      } 
  }

   selectDifficulty(level: 'low' | 'medium' | 'high') {
    this.selectedDifficulty = level;
    localStorage.setItem('difficulty', level);// Save difficulty
  }

  // Funcția care deloghează utilizatorul
  logout() {
    this.afAuth.signOut().then(() => {
      // după ce se deloghează cu succes, îl redirecționăm la pagina de login
      this.router.navigate(['/login']);
    });
  }
}
