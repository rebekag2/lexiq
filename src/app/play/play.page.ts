import { Component, OnInit } from '@angular/core';
import { WordService } from '../services/word.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
  standalone: false,
})
export class PlayPage implements OnInit {

  isSaved = false; 
  selectedDifficulty: 'low' | 'medium' | 'high' = 'medium';

  options: Array<{ id: number, text: string }> = [];
  word: string = '';
  synonyms: string[] = [];
  antonyms: string[] = [];
  pronunciation: string = '';
  type: 'synonym' | 'antonym' | null = null;

  selectedOptionId: number | null = null;
  correctAnswer: string = '';
  isOptionSelectable = true;

  isOffline: boolean = false;

  constructor(private route: ActivatedRoute, private wordService: WordService) { }

  ngOnInit(): void {
    Network.getStatus().then(status => {
      this.isOffline = !status.connected;
      console.log("offline:", this.isOffline);

      this.startLoadingWord(); 
    });

    Network.addListener('networkStatusChange', (status) => {
      this.isOffline = !status.connected;
      console.log("offline:", this.isOffline);
    });

    const difficulty = localStorage.getItem('difficulty') || 'medium';
    if (difficulty === 'low' || difficulty === 'medium' || difficulty === 'high') {
      this.selectedDifficulty = difficulty;
    }
  }

    startLoadingWord() {
      
      this.route.queryParams.subscribe((params) => {
      this.type = params['type'] === 'antonym' ? 'antonym' : 'synonym';
      console.log("type in play page:", this.type);

      
        if (this.type === 'synonym') {
          this.fetchWordWithSynonym();
        } else if (this.type === 'antonym') {
          this.fetchWordWithAntonym();
        }
      });
   
    }

  fetchWordWithSynonym() {
    if (this.isOffline) {
      this.loadFromSaved('synonym');
      return;
    }

    this.wordService.getRandomWord().subscribe((word) => {
      this.wordService.getWordSynonyms(word.word).subscribe((res) => {
        if (res.synonyms.length > 0) {
          this.word = word.word;
          const correct = res.synonyms[0];
          this.correctAnswer = correct;
          this.createOptions(correct);
          this.isSaved = this.wordService.isWordSaved(this.word, correct, 'synonym');
        } else {
          this.fetchWordWithSynonym(); 
        }
      });
    });
  }

  fetchWordWithAntonym() {
    if (this.isOffline) {
      this.loadFromSaved('antonym');
      return;
    }

    this.wordService.getRandomWord().subscribe((word) => {
      this.wordService.getWordAntonyms(word.word).subscribe((res) => {
        if (res.antonyms.length > 0) {
          this.word = word.word;
          const correct = res.antonyms[0];
          this.correctAnswer = correct;
          this.createOptions(correct);
          this.isSaved = this.wordService.isWordSaved(this.word, correct, 'antonym');
        } else {
          this.fetchWordWithAntonym(); // retry if no antonyms
        }
      });
    });
  }


  loadFromSaved(type: 'synonym' | 'antonym') {
    const saved = this.wordService.getSavedWords();

    // Filter saved words by type
    const filtered = saved.filter(word => word.type === type);

    if (filtered.length === 0) {
      alert('No saved words available for offline mode.');
      return;

    }

    // Pick a random saved word of the correct type
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const selected = filtered[randomIndex];

    this.word = selected.word;
    this.correctAnswer = selected.pair;
    this.isSaved = true;

    // Get wrong options from other saved pairs of same type (excluding current pair)
    const wrongOptionsSet = new Set<string>();
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i].word !== selected.word && filtered[i].pair !== selected.pair) {
        wrongOptionsSet.add(filtered[i].pair);
      }
      if (wrongOptionsSet.size >= 3) break;
    }

    const allOptions = [selected.pair, ...Array.from(wrongOptionsSet).slice(0, 3)];
    const shuffled = allOptions
      .sort(() => 0.5 - Math.random())
      .map((word, index) => ({ id: index + 1, text: word }));

    this.options = shuffled;

  }

  createOptions(correctAnswer: string) {
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

      // If not enough unique wrong options, try again recursively
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
    console.log("selecte doption:", option.text);

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

    if (this.isSaved && this.word && this.correctAnswer && this.type) {
      this.wordService.saveWord({ word: this.word, pair: this.correctAnswer, type: this.type });
    } else if (this.word && this.correctAnswer && this.type) {
      this.wordService.removeWord(this.word, this.correctAnswer, this.type);
    }
  }
}
