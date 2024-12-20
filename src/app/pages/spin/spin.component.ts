import { Component, ViewChild, HostListener } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FirstPrizeComponent } from '../first-prize/first-prize.component';
import { SecondPrizeComponent } from '../second-prize/second-prize.component';
import { ThirdPrizeComponent } from '../third-prize/third-prize.component';
import { FourthPrizeComponent } from '../fourth-prize/fourth-prize.component';
import { WaitingComponent } from '../waiting/waiting.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SpecialPrizeComponent } from "../special-prize/special-prize.component";
import { LoteryComponent } from '../lotery/lotery.component';
import { FourPrizeBComponent } from "../four-prize-b/four-prize-b.component";
import { ThirdPrizeBComponent } from "../third-prize-b/third-prize-b.component";
import { SecondPrizeBComponent } from "../second-prize-b/second-prize-b.component";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';  // Import CommonModule


@Component({
  selector: 'app-spin',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FirstPrizeComponent,
    SecondPrizeComponent,
    ThirdPrizeComponent,
    FourthPrizeComponent,
    WaitingComponent,
    MatTabsModule,
    SpecialPrizeComponent,
    LoteryComponent,
    FourPrizeBComponent,
    ThirdPrizeBComponent,
    SecondPrizeBComponent,
    CommonModule
  ],
  templateUrl: './spin.component.html',
  styleUrl: './spin.component.css',
  animations: [
    trigger('slideInOut', [
      state(
        'visible',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      state(
        'hidden',
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
        })
      ),
      transition('visible <=> hidden', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class SpinComponent {
  selectedIndex = 0;
  isTabHeaderVisible = true;
  onTabChange(event: any) {
    this.selectedIndex = event.index;
    console.log('Tab changed to: ', this.selectedIndex);
  }

  isTabVisible = true; // Trạng thái để kiểm soát việc ẩn hiện tab


  // Hiển thị thanh tab khi chuột vào
  showTab(): void {
    this.isTabVisible = true;
  }

  // Ẩn thanh tab khi chuột ra ngoài
  hideTab(): void {
    this.isTabVisible = false;
  }




}
