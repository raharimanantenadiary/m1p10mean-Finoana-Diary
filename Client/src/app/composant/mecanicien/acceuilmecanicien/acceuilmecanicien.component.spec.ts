import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilmecanicienComponent } from './acceuilmecanicien.component';

describe('AcceuilmecanicienComponent', () => {
  let component: AcceuilmecanicienComponent;
  let fixture: ComponentFixture<AcceuilmecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilmecanicienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilmecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
