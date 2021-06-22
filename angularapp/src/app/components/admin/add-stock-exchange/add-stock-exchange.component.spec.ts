import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockExchangeComponent } from './add-stock-exchange.component';

describe('AddStockExchangeComponent', () => {
  let component: AddStockExchangeComponent;
  let fixture: ComponentFixture<AddStockExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStockExchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
