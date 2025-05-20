import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.page.html',
  styleUrls: ['./word-details.page.scss'],
  standalone: false,
})
export class WordDetailsPage implements OnInit {
  backButtonLabel = 'Home';  // default label
  fromPage: string | null = null;

  wordDetails: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.fromPage = this.route.snapshot.queryParamMap.get('from');

    if (this.fromPage === 'play') {
      this.backButtonLabel = 'Back to play';
    } else {
      this.backButtonLabel = 'Back';
    }



    const word = this.route.snapshot.queryParamMap.get('word');

    // Simulate an API response for now
    this.wordDetails = {
      name: word,
      color: 'Green',
      idk: 'Fruit category',
      idk2: 'Ignore this'
    };


  }

  goBack() {
    if (this.fromPage === 'play') {
      this.router.navigate(['/play']);
    } else {
      this.router.navigate(['/saved-words']);
    }
  }

}
  