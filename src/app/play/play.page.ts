import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
  standalone: false,
})
export class PlayPage {

  isSaved = false; 
  selectedDifficulty: 'low' | 'medium' | 'high' = 'medium'; // will get from settings later

  options: Array<{ id: number, text: string }> = [];

  constructor() {
    this.loadOptions();
  }

  loadOptions() {
    // Setup options count based on difficulty, placeholder text for now
    let optionCount = 3; // default medium
    if (this.selectedDifficulty === 'low') optionCount = 2;
    else if (this.selectedDifficulty === 'high') optionCount = 4;

    this.options = Array.from({ length: optionCount }, (_, i) => ({
      id: i + 1,
      text: `Option ${i + 1}`
    }));
  }

  selectOption(option: any) {
    console.log('Selected option:', option);
    // Placeholder, you will add your selection logic here later
  }

  toggleSave() {
  this.isSaved = !this.isSaved;
}

}
