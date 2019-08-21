import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSinglePage } from './field-single.page';

describe('FieldSinglePage', () => {
  let component: FieldSinglePage;
  let fixture: ComponentFixture<FieldSinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldSinglePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
