import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewaccountComponent } from './user-viewaccount.component';

describe('UserViewaccountComponent', () => {
  let component: UserViewaccountComponent;
  let fixture: ComponentFixture<UserViewaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
