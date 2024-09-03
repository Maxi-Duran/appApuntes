import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmNamePage } from './confirm-name.page';

describe('ConfirmNamePage', () => {
  let component: ConfirmNamePage;
  let fixture: ComponentFixture<ConfirmNamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
