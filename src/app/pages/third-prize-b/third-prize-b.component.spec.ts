import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPrizeBComponent } from './third-prize-b.component';

describe('ThirdPrizeBComponent', () => {
  let component: ThirdPrizeBComponent;
  let fixture: ComponentFixture<ThirdPrizeBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdPrizeBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdPrizeBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
