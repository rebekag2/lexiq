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
