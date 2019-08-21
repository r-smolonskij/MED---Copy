import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSinglePage } from './word-single.page';

describe('WordSinglePage', () => {
  let component: WordSinglePage;
  let fixture: ComponentFixture<WordSinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordSinglePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
