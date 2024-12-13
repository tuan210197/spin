import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPrizeComponent } from './third-prize.component';

describe('ThirdPrizeComponent', () => {
  let component: ThirdPrizeComponent;
  let fixture: ComponentFixture<ThirdPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdPrizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
