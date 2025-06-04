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

    selectedDifficulty: 'low' | 'medium' | 'high' = 'medium'; 

 constructor(
    private afAuth: AngularFireAuth, // pentru autentificare
    private router: Router // pentru a redirectiona utilizatorul 
  ) {}
  
  ngOnInit(): void {
    const saved = localStorage.getItem('difficulty');
      if (saved === 'low' || saved === 'medium' || saved === 'high') {
        this.selectedDifficulty = saved;
      } 
  }

   selectDifficulty(level: 'low' | 'medium' | 'high') {
    this.selectedDifficulty = level;
    localStorage.setItem('difficulty', level); 
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
