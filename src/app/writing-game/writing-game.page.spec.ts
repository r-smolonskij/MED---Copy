import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingGamePage } from './writing-game.page';

describe('WritingGamePage', () => {
  let component: WritingGamePage;
  let fixture: ComponentFixture<WritingGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritingGamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
