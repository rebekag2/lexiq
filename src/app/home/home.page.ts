import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router) {}

  // goToSynonyms() {
  //   this.router.navigate(['/play']);
  // }

  // goToAntonyms() {
  //    this.router.navigate(['/play']);
  // }

  goToPlay(type: 'synonym' | 'antonym') {
    this.router.navigate(['/play'], { queryParams: { type } });
    console.log("play type:", type);
  }
}


