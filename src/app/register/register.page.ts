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

  this.afAuth.createUserWithEmailAndPassword(this.email, this.password)//createUserWithEmailAndPassword creeaza un user nou in Firebase Authentication.
    .then(userCredential => {
      console.log('Registration successful', userCredential);

      //putem salva numele userului in profilul Firebase
      userCredential.user?.updateProfile({ displayName: this.name }); //Daca totul e OK, poti seta numele cu updateProfile.
      this.router.navigate(['/home']); // Dupa inregistrare, trimitem userul la Home
    })
    .catch(error => {
      console.error('Registration error', error);
      alert('Registration failed: ' + error.message);
    });
}
}
