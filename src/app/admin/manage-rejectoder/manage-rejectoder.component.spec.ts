import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRejectoderComponent } from './manage-rejectoder.component';

describe('ManageRejectoderComponent', () => {
  let component: ManageRejectoderComponent;
  let fixture: ComponentFixture<ManageRejectoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRejectoderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRejectoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
