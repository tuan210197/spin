import { Component } from '@angular/core';
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
    LoteryComponent

  ],
  templateUrl: './spin.component.html',
  styleUrl: './spin.component.css'
})
export class SpinComponent {
  // Hàm xử lý khi thay đổi tab

  selectedIndex = 0;
  onTabChange(event: any) {
    this.selectedIndex = event.index;
    console.log('Tab changed to: ', this.selectedIndex);
  }
}
