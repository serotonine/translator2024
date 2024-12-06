import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChooseComponent } from './list-choose.component';

describe('ListChooseComponent', () => {
  let component: ListChooseComponent;
  let fixture: ComponentFixture<ListChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListChooseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
