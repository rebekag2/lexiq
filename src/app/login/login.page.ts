//pagina de LogIn

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  
import { Router } from '@angular/router';  

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

   //verifica daca userul exista si parola e corecta
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)  

    //then se executa daca login-ul a fost OK, iar catch daca a fost o problema (email gresit, parola gresita, user inexistent etc).
      .then(userCredential => {  
        // Daca loginul reuseste, primim userCredential
        
        console.log('Login successful', userCredential);  
        this.router.navigate(['/home']);  
      })

      .catch(error => {  
        console.error('Login error', error);  
        alert('Login failed: ' + error.message);  
      });
  }
  
}
