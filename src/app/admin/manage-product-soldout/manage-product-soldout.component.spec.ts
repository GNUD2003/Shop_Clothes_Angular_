import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductSoldoutComponent } from './manage-product-soldout.component';

describe('ManageProductSoldoutComponent', () => {
  let component: ManageProductSoldoutComponent;
  let fixture: ComponentFixture<ManageProductSoldoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProductSoldoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProductSoldoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
