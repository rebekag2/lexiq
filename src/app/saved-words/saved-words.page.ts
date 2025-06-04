import { Component } from '@angular/core';
import { WordService } from '../services/word.service'; 
import { SavedWord } from '../models';

@Component({
  selector: 'app-saved-words',
  templateUrl: './saved-words.page.html',
  styleUrls: ['./saved-words.page.scss'],
  standalone: false,
})
export class SavedWordsPage {
  savedWords: SavedWord[] = [];

  constructor(private wordService: WordService) {}

  ionViewWillEnter() {
    this.savedWords = this.wordService.getSavedWords();
  }

  deleteWord(index: number) {
    const wordToRemove = this.savedWords[index];
    this.wordService.removeWord(wordToRemove.word, wordToRemove.pair, wordToRemove.type);
    this.savedWords.splice(index, 1);
  }
}
