export interface RandomWordResponse {
    word: string;
}

export interface WordDetails {
  word: string;
  results?: Array<{
    definition?: string;
    partOfSpeech?: string;
    synonyms?: string[];
    antonyms?: string[];
  }>;
}


export interface SavedWord {
  word: string;
  pair: string; // the synonym or antonym
  type: 'synonym' | 'antonym'; 
}