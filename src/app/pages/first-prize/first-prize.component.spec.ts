import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPrizeComponent } from './first-prize.component';

describe('FirstPrizeComponent', () => {
  let component: FirstPrizeComponent;
  let fixture: ComponentFixture<FirstPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstPrizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
