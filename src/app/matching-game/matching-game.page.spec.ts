import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingGamePage } from './matching-game.page';

describe('MatchingGamePage', () => {
  let component: MatchingGamePage;
  let fixture: ComponentFixture<MatchingGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingGamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
