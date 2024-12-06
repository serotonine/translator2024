import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChooseComponent } from './manage-choose.component';

describe('ManageChooseComponent', () => {
  let component: ManageChooseComponent;
  let fixture: ComponentFixture<ManageChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChooseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
