import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdFilterComponent } from './prod-filter.component';

describe('ProdFilterComponent', () => {
  let component: ProdFilterComponent;
  let fixture: ComponentFixture<ProdFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
