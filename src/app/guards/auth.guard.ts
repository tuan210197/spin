// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isLoginPage = state.url === '/login';
    const admin = state.url === '/admin';

    debugger

    if (isLoggedIn && isLoginPage) {
      this.router.navigateByUrl('/spin');
      return false;
    }

    if (!isLoggedIn && !isLoginPage) {
      this.router.navigateByUrl('/login');
      return false;
    }
    if(!isLoggedIn && admin ){
      this.router.navigateByUrl('/admin');
      return false;
    }

    return true;
  }
}
