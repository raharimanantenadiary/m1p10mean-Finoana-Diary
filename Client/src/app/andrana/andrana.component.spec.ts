import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndranaComponent } from './andrana.component';

describe('AndranaComponent', () => {
  let component: AndranaComponent;
  let fixture: ComponentFixture<AndranaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AndranaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AndranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
