import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondPrizeComponent } from './second-prize.component';

describe('SecondPrizeComponent', () => {
  let component: SecondPrizeComponent;
  let fixture: ComponentFixture<SecondPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondPrizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
