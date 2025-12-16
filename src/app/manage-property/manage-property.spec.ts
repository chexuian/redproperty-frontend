import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProperty } from './manage-property';

describe('ManageProperty', () => {
  let component: ManageProperty;
  let fixture: ComponentFixture<ManageProperty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProperty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProperty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
