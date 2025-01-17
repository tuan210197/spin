import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';


import { LoteryComponent } from './pages/lotery/lotery.component';
import { FirstPrizeComponent } from './pages/first-prize/first-prize.component';
import { SecondPrizeComponent } from './pages/second-prize/second-prize.component';
import { ThirdPrizeComponent } from './pages/third-prize/third-prize.component';
import { FourthPrizeComponent } from './pages/fourth-prize/fourth-prize.component';
import { SpecialPrizeComponent } from './pages/special-prize/special-prize.component';
import { AppComponent } from './app.component';
import { WaitingComponent } from './pages/waiting/waiting.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SpinComponent } from './pages/spin/spin.component';
import { FourPrizeBComponent } from './pages/four-prize-b/four-prize-b.component';



export const routes: Routes = [

    // { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/spin', pathMatch: 'full' },
    { path: 'first', component: FirstPrizeComponent, canActivate: [AuthGuard] },
    { path: 'second', component: SecondPrizeComponent, canActivate: [AuthGuard] },
    { path: 'third', component: ThirdPrizeComponent, canActivate: [AuthGuard] },
    { path: 'four', component: FourthPrizeComponent, canActivate: [AuthGuard] },
    { path: 'fourb', component: FourPrizeBComponent, canActivate: [AuthGuard] },

    { path: 'special', component: SpecialPrizeComponent, canActivate: [AuthGuard] },
    { path: 'lotery', component: LoteryComponent, canActivate: [AuthGuard] },
    { path: 'home', component: AppComponent, canActivate: [AuthGuard] },
    { path: 'wait', component: WaitingComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, },
    { path: 'spin', component: SpinComponent, canActivate: [AuthGuard] }

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }