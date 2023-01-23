import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilfinancierComponent } from './acceuilfinancier.component';

describe('AcceuilfinancierComponent', () => {
  let component: AcceuilfinancierComponent;
  let fixture: ComponentFixture<AcceuilfinancierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilfinancierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilfinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
