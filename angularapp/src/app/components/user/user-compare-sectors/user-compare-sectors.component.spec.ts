import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompareSectorsComponent } from './user-compare-sectors.component';

describe('UserCompareSectorsComponent', () => {
  let component: UserCompareSectorsComponent;
  let fixture: ComponentFixture<UserCompareSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompareSectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompareSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
