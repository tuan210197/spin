import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FirstPrizeComponent } from "./pages/first-prize/first-prize.component";
import { LoteryComponent } from "./pages/lotery/lotery.component";
import { FourthPrizeComponent } from "./pages/fourth-prize/fourth-prize.component";
import { ThirdPrizeComponent } from "./pages/third-prize/third-prize.component";
import { SecondPrizeComponent } from "./pages/second-prize/second-prize.component";
import { MatTabsModule } from '@angular/material/tabs';
import { SpecialPrizeComponent } from "./pages/special-prize/special-prize.component";
import { WaitingComponent } from "./pages/waiting/waiting.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FirstPrizeComponent,
    LoteryComponent,
    FourthPrizeComponent,
    ThirdPrizeComponent,
    SecondPrizeComponent,
    MatTabsModule,
    SpecialPrizeComponent,
    WaitingComponent,
    // RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  title = 'Angular Material Tabs Example';
  selectedIndex = 0;

  // Hàm xử lý khi thay đổi tab
  onTabChange(event: any) {
    this.selectedIndex = event.index;
    console.log('Tab changed to: ', this.selectedIndex);
  }

}
