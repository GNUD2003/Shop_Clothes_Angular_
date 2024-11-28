import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBlockAccountComponent } from './manage-block-account.component';

describe('ManageBlockAccountComponent', () => {
  let component: ManageBlockAccountComponent;
  let fixture: ComponentFixture<ManageBlockAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBlockAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBlockAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
