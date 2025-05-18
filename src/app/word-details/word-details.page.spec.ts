import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordDetailsPage } from './word-details.page';

describe('WordDetailsPage', () => {
  let component: WordDetailsPage;
  let fixture: ComponentFixture<WordDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WordDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
