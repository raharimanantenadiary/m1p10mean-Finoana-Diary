import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifieravancementComponent } from './modifieravancement.component';

describe('ModifieravancementComponent', () => {
  let component: ModifieravancementComponent;
  let fixture: ComponentFixture<ModifieravancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifieravancementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifieravancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
