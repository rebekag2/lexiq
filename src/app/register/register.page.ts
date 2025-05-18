import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage  {


  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  register() {
  if (!this.name || !this.email || !this.password) {
    alert('Please fill all fields');
    return;
  }

  this.afAuth.createUserWithEmailAndPassword(this.email, this.password)//createUserWithEmailAndPassword creează un user nou în Firebase Authentication.
    .then(userCredential => {
      console.log('Registration successful', userCredential);
      // Opțional: putem salva numele userului în profilul Firebase
      userCredential.user?.updateProfile({ displayName: this.name }); //Dacă totul e OK, poți seta numele cu updateProfile.
      this.router.navigate(['/home']); // După înregistrare, trimitem userul la Home
    })
    .catch(error => {
      console.error('Registration error', error);
      alert('Registration failed: ' + error.message);
    });
}
}
