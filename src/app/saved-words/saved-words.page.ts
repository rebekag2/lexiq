import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-words',
  templateUrl: './saved-words.page.html',
  styleUrls: ['./saved-words.page.scss'],
  standalone: false,
})
export class SavedWordsPage implements OnInit {
 savedWords: string[] = ["gfghftfgg","gfgfgtfgg"]; // bind your saved words here later

  constructor() {}

  ngOnInit() {
    // Load saved words from localStorage or service here later
  }

  deleteWord(index: number) {
    // Remove the word from the array & update localStorage later
    this.savedWords.splice(index, 1);
  }
}
 