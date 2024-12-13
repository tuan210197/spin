import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthPrizeComponent } from './fourth-prize.component';

describe('FourthPrizeComponent', () => {
  let component: FourthPrizeComponent;
  let fixture: ComponentFixture<FourthPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourthPrizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
