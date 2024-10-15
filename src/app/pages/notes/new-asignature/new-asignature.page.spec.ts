import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAsignaturePage } from './new-asignature.page';

describe('NewAsignaturePage', () => {
  let component: NewAsignaturePage;
  let fixture: ComponentFixture<NewAsignaturePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAsignaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
