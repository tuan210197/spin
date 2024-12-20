import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondPrizeBComponent } from './second-prize-b.component';

describe('SecondPrizeBComponent', () => {
  let component: SecondPrizeBComponent;
  let fixture: ComponentFixture<SecondPrizeBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondPrizeBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondPrizeBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
