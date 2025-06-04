import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordService } from '../services/word.service';

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
  word: string = ''; 
  synonyms: string[] = [];
  antonyms: string[] = [];
  pronunciation: string = '';
  type: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private wordService: WordService ) {}

  ngOnInit(): void {
    this.fromPage = this.route.snapshot.queryParamMap.get('from');
    this.type = this.route.snapshot.queryParamMap.get('type');
    console.log("type page back in details:", this.type);

    if (this.fromPage === 'play') {
      this.backButtonLabel = 'Back to play';
    } else {
      this.backButtonLabel = 'Back';
    }
    
      //getting passed word from url and  getting its details
      this.route.queryParams.subscribe(params => {
        this.word = params['word'] ;

        this.wordService.getWordSynonyms(this.word).subscribe(data => {
          console.log("synonyms:", data.synonyms);
        this.synonyms = data.synonyms?.slice(0, 3); // get max 3
    });

    this.wordService.getWordAntonyms(this.word).subscribe(data => {
      console.log("antonyms:", data.antonyms);
      this.antonyms = data.antonyms?.slice(0, 3);
    });

    this.wordService.getWordPronunciation(this.word).subscribe(data => {
       console.log("pronunciation:", data);
      this.pronunciation = typeof data.pronunciation === 'object' ? data.pronunciation.all : data.pronunciation;
    });

  });

}

  goBack(): void {
    if (this.fromPage === 'play') {
      console.log("type in details:", this.type);
      this.router.navigate(['/play'], { queryParams: { type: this.type }});

    } else {
      this.router.navigate(['/saved-words']);
    }
  }

}
  