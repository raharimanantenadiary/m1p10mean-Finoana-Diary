import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailavancementComponent } from './detailavancement.component';

describe('DetailavancementComponent', () => {
  let component: DetailavancementComponent;
  let fixture: ComponentFixture<DetailavancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailavancementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailavancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
