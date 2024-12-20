import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourPrizeBComponent } from './four-prize-b.component';

describe('FourPrizeBComponent', () => {
  let component: FourPrizeBComponent;
  let fixture: ComponentFixture<FourPrizeBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourPrizeBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourPrizeBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
