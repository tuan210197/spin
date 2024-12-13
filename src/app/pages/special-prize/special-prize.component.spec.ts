import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPrizeComponent } from './special-prize.component';

describe('SpecialPrizeComponent', () => {
  let component: SpecialPrizeComponent;
  let fixture: ComponentFixture<SpecialPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialPrizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
