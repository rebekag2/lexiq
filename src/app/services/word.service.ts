import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RandomWordResponse, WordDetails } from '../models';
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

}

