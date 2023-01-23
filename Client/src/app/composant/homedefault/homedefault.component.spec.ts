import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomedefaultComponent } from './homedefault.component';

describe('HomedefaultComponent', () => {
  let component: HomedefaultComponent;
  let fixture: ComponentFixture<HomedefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomedefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomedefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
