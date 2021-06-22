import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompareCompaniesComponent } from './user-compare-companies.component';

describe('UserCompareCompaniesComponent', () => {
  let component: UserCompareCompaniesComponent;
  let fixture: ComponentFixture<UserCompareCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompareCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompareCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
