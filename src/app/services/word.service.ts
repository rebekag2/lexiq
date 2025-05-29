import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RandomWordResponse, WordDetails, SavedWord } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  // private apiUrl = 'https://wordsapiv1.p.rapidapi.com/words';
  //  private headers = new HttpHeaders({
  //   'X-RapidAPI-Key': 'e8b92db9aamshbd324178500a0e6p13a940jsna24451a8b4b9',
  //   'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
  // });

  private apiUrl = 'https://wordsapiv1.p.rapidapi.com/words';

  private headers = new HttpHeaders({
     'x-rapidapi-host': environment.wordsApiHost,
     'x-rapidapi-key': environment.wordsApiKey
  });
  constructor(private http: HttpClient) { }


 getRandomWord(): Observable<any> {
    return this.http.get(`${this.apiUrl}/?random=true`, { headers: this.headers });
  }

  getWordSynonyms(word: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${word}/synonyms`, { headers: this.headers });
  }

  getWordAntonyms(word: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${word}/antonyms`, { headers: this.headers });
  }

  getWordPronunciation(word: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${word}/pronunciation`, { headers: this.headers });
  }


  private readonly STORAGE_KEY = 'savedWords';
 saveWord(savedWord: SavedWord) {
  const current = this.getSavedWords();
  const exists = current.some(w => 
    w.word === savedWord.word &&
    w.pair === savedWord.pair &&
    w.type === savedWord.type
  );

  if (!exists) {
    current.push(savedWord);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(current));
  }
}

removeWord(word: string, pair: string, type: 'synonym' | 'antonym') {
  const current = this.getSavedWords();
  const filtered = current.filter(w => !(w.word === word && w.pair === pair && w.type === type));
  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
}

 getSavedWords(): SavedWord[] {
  const saved = localStorage.getItem(this.STORAGE_KEY);
  console.log("saved words:", saved);
  return saved ? JSON.parse(saved) : [];

}

isWordSaved(word: string, pair: string, type: 'synonym' | 'antonym'): boolean {
  const saved = this.getSavedWords();
  return saved.some(w => w.word === word && w.pair === pair && w.type === type);
}
}

