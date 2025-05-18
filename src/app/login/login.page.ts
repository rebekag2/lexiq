import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';  
// Importăm serviciul AngularFireAuth care ne ajută să facem autentificare cu Firebase

import { Router } from '@angular/router';  
// Importăm Router pentru a putea face navigare programatică după login

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  email: string = '';  
  password: string = '';  

  constructor(private afAuth: AngularFireAuth, private router: Router) { }  

  login() {  
    if (!this.email || !this.password) {  
      alert('Please enter email and password');  
      return;
    }

    this.afAuth.signInWithEmailAndPassword(this.email, this.password)  
    //this.afAuth.signInWithEmailAndPassword(email, password) este metoda Firebase care verifică dacă userul există și parola e corectă.

    //then se execută dacă login-ul a fost OK, iar catch dacă a fost o problemă (email greșit, parolă greșită, user inexistent etc).
      .then(userCredential => {  
        // Dacă loginul reușește, primim userCredential

        console.log('Login successful', userCredential);  
        this.router.navigate(['/home']);  
      })

      .catch(error => {  
        console.error('Login error', error);  
        alert('Login failed: ' + error.message);  
      });
  }
  
}
