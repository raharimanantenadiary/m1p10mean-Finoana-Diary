import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationComponent } from './validation.component';

describe('InscriptionComponent', () => {
  let component: ValidationComponent;
  let fixture: ComponentFixture<ValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
