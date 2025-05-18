import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedWordsPage } from './saved-words.page';

describe('SavedWordsPage', () => {
  let component: SavedWordsPage;
  let fixture: ComponentFixture<SavedWordsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedWordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
