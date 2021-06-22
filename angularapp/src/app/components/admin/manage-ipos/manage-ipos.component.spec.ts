import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIPOsComponent } from './manage-ipos.component';

describe('ManageIPOsComponent', () => {
  let component: ManageIPOsComponent;
  let fixture: ComponentFixture<ManageIPOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIPOsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIPOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
