import { Component, OnInit } from '@angular/core';
import { WordService } from '../services/word.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
  standalone: false,
})
export class PlayPage implements OnInit {

  isSaved = false; 
  selectedDifficulty: 'low' | 'medium' | 'high' = 'medium'; // will get from settings later

  options: Array<{ id: number, text: string }> = [];
  word: string = '';
  synonyms: string[] = [];
  antonyms: string[] = [];
  pronunciation: string = '';
  type: string | null = null;

  selectedOptionId: number | null = null;
  correctAnswer: string = '';
  isOptionSelectable = true;


  constructor( private route: ActivatedRoute, private wordService: WordService) { }

  ngOnInit(): void {
      // Get difficulty from localStorage first
    const difficulty = localStorage.getItem('difficulty') || 'medium';
    if (difficulty === 'low' || difficulty === 'medium' || difficulty === 'high') {
      this.selectedDifficulty = difficulty;
    }

    // Then get the query param and load the word accordingly
    this.route.queryParams.subscribe((params) => {
      this.type = params['type'];
      console.log("type in play page:", this.type);

      if (this.type === 'synonym') {
        this.fetchWordWithSynonym();
      } else if (this.type === 'antonym') {
        this.fetchWordWithAntonym();
      }
    });
  }

    

  //check for the selecte card's type
 

  //if type is Synonym
  fetchWordWithSynonym() {
      this.wordService.getRandomWord().subscribe((word) => {

        this.wordService.getWordSynonyms(word.word).subscribe((res) => {
        if (res.synonyms.length > 0) {
          this.word = word.word;
          console.log("word:",word.word);
          const correct = res.synonyms[0];
          this.createOptions(correct);

        } else {
          this.fetchWordWithSynonym(); // retry
        }
      });
    });
  }

  //if type is Antonym
  fetchWordWithAntonym() {
    this.wordService.getRandomWord().subscribe((word) => {
      
       this.wordService.getWordAntonyms(word.word).subscribe((res) => {
        if (res.antonyms.length > 0) {
          this.word = word.word;
          console.log("word:",word.word);
          const correct = res.antonyms[0];
          this.createOptions(correct); 

        } else {
          this.fetchWordWithAntonym(); // retry
        }
      });
    });
  }

  createOptions(correctAnswer: string) {
    console.log("difficulty:", this.selectedDifficulty);
    this.correctAnswer = correctAnswer; // Save it for later check
    this.selectedOptionId = null;
    this.isOptionSelectable = true;


  let optionCount = 3;
  if (this.selectedDifficulty === 'low') optionCount = 2;
  else if (this.selectedDifficulty === 'high') optionCount = 4;

  const wrongOptionCount = optionCount - 1;
  const randomWordCalls = Array.from({ length: wrongOptionCount }, () => this.wordService.getRandomWord());

  forkJoin(randomWordCalls).subscribe((randomWords) => {
    const wrongOptionsSet = new Set<string>();
    
    // Filter out duplicates and the correct answer
    randomWords.forEach(wordObj => {
      const w = wordObj.word;
      if (w !== correctAnswer) {
        wrongOptionsSet.add(w);
      }
    });

    // If not enough unique wrong options, recursively try again
    if (wrongOptionsSet.size < wrongOptionCount) {
      this.createOptions(correctAnswer);
      return;
    }

    const wrongOptions = Array.from(wrongOptionsSet).slice(0, wrongOptionCount);
    const allOptions = [...wrongOptions, correctAnswer];

    // Shuffle final options
    const finalOptions = allOptions
      .sort(() => 0.5 - Math.random())
      .map((word, index) => ({ id: index + 1, text: word }));

    this.options = finalOptions;
  });
}


selectOption(option: { id: number, text: string }) {
  if (!this.isOptionSelectable) return;

  this.selectedOptionId = option.id;
  this.isOptionSelectable = false;

  const isCorrect = option.text === this.correctAnswer;
  console.log('Selected:', option.text, '| Correct:', this.correctAnswer, '| Is Correct?', isCorrect);

  // Wait 2 seconds before showing a new word
  setTimeout(() => {
    this.selectedOptionId = null;
    this.options = [];

    if (this.type === 'synonym') {
      this.fetchWordWithSynonym();
    } else if (this.type === 'antonym') {
      this.fetchWordWithAntonym();
    }
  }, 2000);
}

  toggleSave() {
  this.isSaved = !this.isSaved;
}

}
