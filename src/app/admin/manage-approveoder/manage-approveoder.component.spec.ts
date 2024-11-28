import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApproveoderComponent } from './manage-approveoder.component';

describe('ManageApproveoderComponent', () => {
  let component: ManageApproveoderComponent;
  let fixture: ComponentFixture<ManageApproveoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageApproveoderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageApproveoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
